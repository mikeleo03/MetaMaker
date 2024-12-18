const fs = require("fs");
const google = require('googleapis');
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

async function uploadFile(file) {
    const fileMetadata = {
        name: file.name
    }

    const media = {
        mimeType: file.type,
        body: fs.createReadStream(file.path)
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

module.exports = { uploadFile };