require("dotenv").config();
const express = require("express");
const GithubService = require("../service/githubService");
const { deleteAllFiles, downloadFile, getFileMetadata } = require("../service/googleDriveService");
const { oracleDeclareWinner } = require("../service/oracleService");
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post("/win", async (req, res) => {
    try {
        // const winner = await oracleDeclareWinner();
        const winner = req.body;
        const fileId = winner.link.split("/d/")[1].split("/")[0]; 
        const fileMetadata = await getFileMetadata(fileId);
        const fileName = fileMetadata.name;
        const tempDownloadPath = path.join(__dirname, "..", "uploads", fileName);
    
        await downloadFile(fileId, tempDownloadPath);

        const encodedContent = fs.readFileSync(tempDownloadPath, { encoding: "base64" });
        const githubService = new GithubService(`${process.env.PERSONAL_ACCESS_TOKEN}`);
        await githubService.uploadFileToRepo(fileName , encodedContent);

        await deleteAllFiles();

        fs.unlinkSync(tempDownloadPath);

        res.status(200).json({
            message: "Winner file uploaded to GitHub.",
        });
    } catch (error) {
        console.error("Error processing winner:", error);
        res.status(500).json({ message: "Failed to process winner", error: error.message });
    }
})

module.exports = router;