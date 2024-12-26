const fs = require("fs");
const { google } = require('googleapis');
require('dotenv').config()

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_API_REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({ version: "v3", auth: oauth2Client });

async function getFileMetadata(fileId) {
    try {
        const response = await drive.files.get({
            fileId: fileId,
            fields: "id, name, mimeType",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching file metadata:", error);
        throw error;
    }
}

async function uploadFile(file) {
    const fileMetadata = {
        name: file.name,
        parents: [`${process.env.FOLDER_ID}`],
    }

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.tempFilePath)
    }

    try {
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id, webViewLink",
        })

        return response.data.webViewLink;
    } catch (error) {
        console.error("Error uploading file to Google Drive:", error);
        throw error;
    }
}

async function getAllFiles() {
    try {
        const response = await drive.files.list({
            q: `'${process.env.FOLDER_ID}' in parents and trashed = false`,
            fields: 'files(id, name, webViewLink)',
        });

        const files = response.data.files;
        if (files.length === 0) {
            console.log('No files found.');
            return [];
        }

        return files;
    } catch (error) {
        console.error('Error fetching files from Google Drive:', error);
        throw error;
    }
}

async function deleteAllFiles() {
    try {
        const files = await getAllFiles();

        if (files.length === 0) {
            console.log('No files to delete.');
            return;
        }

        for (const file of files) {
            try {
                await drive.files.delete({
                    fileId: file.id,
                });
                console.log(`File deleted: ${file.name}`);
            } catch (error) {
                console.error(`Error deleting file (${file.name}):`, error);
            }
        }

        console.log('All files deleted successfully.');
    } catch (error) {
        console.error('Error deleting all files:', error);
        throw error;
    }
}

async function downloadFile(fileId, destinationPath) {
    try {
        // Mendapatkan file dari Google Drive
        const dest = fs.createWriteStream(destinationPath);

        const response = await drive.files.get(
            { fileId: fileId, alt: "media" },
            { responseType: "stream" }
        );

        // Mengalirkan data ke file lokal
        response.data.pipe(dest);

        return new Promise((resolve, reject) => {
            dest.on("finish", () => resolve(`File downloaded to: ${destinationPath}`));
            dest.on("error", (err) => reject(`Error downloading file: ${err.message}`));
        });
    } catch (error) {
        console.error('Error downloading file from Google Drive:', error);
        throw error;
    }
}

module.exports = { getFileMetadata, uploadFile, getAllFiles, deleteAllFiles, downloadFile };