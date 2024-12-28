require("dotenv").config();
const express = require("express");
const GithubService = require("../service/githubService");
const { deleteAllFiles, downloadFile, getFileMetadata } = require("../service/googleDriveService");
const { oracleCreateNewPatch, oracleVote, oracleDeclareWinner } = require("../service/oracleService");
const path = require('path');
const fs = require('fs');

const router = express.Router();
router.post("/vote", async (req, res) => {
  try {
    const { assetIdx } = req.body;
    if (assetIdx === undefined || assetIdx === null) {
      return res.status(400).json({ message: "Asset ID is required." });
    }

    const result = await oracleVote(assetIdx);
    res.status(200).json({
      message: "Vote successful.",
      data: result,
    });

  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({
      message: "Failed to vote asset.",
      error: error.message,
    });
  }
})

router.post("/win", async (req, res) => {
    try {
        const winner = await oracleDeclareWinner();
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

router.post("/patch", async (req, res) => {
    try {
      const result = await oracleCreateNewPatch();
  
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error in /patch route:", error.message);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });

module.exports = router;