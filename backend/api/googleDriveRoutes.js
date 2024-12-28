const express = require("express");
const { uploadFile, getAllFiles, deleteFileFromLink, deleteAllFiles } = require("../service/googleDriveService");
const { oracleUploadAsset, oracleGetAllAssets } = require("../service/oracleService");

const router = express.Router();

router.delete("/file" , async (req, res) => {
  try {
    const link = req.body.link
    await deleteFileFromLink(link)
    res.status(200).json({
      message: "done"
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message:"Failed to process request", error: error.message });
  }

})

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.asset) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    if (!req.body.title) {
      return res.status(400).json({ message: "Title (name) is required!" });
    }
    if (!req.body.proposer) {
      return res.status(400).json({ message: "Proposer is required!" });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: "Title description is required!" });
    }

    const file = req.files.asset;
    const title = req.body.title;
    const proposer = req.body.proposer;
    const description = req.body.description;

    // Upload gambar ke Google Drive
    const driveLink = await uploadFile(file);

    // Panggil Oracle untuk update link ke Smart Contract
    const txHash = await oracleUploadAsset(driveLink, title, proposer, description);

    res.status(200).json({
      message: "File uploaded and Smart Contract updated!",
      transactionHash: txHash,
    });
  } catch (error) {
    await deleteFileFromLink(driveLink)
    console.error("Error:", error);
    res.status(500).json({ message:"Failed to process request", error: error.message });
  }
});

router.get("/assets", async (req, res) => {
  try {
    const assets = await oracleGetAllAssets();
    const processedAssets = JSON.parse(
      JSON.stringify(assets, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    
    res.status(200).json(processedAssets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ message:"Failed to fetch assets", error: error.message });
  }
});

router.delete("/files", async (req, res) => {
  try {
      await deleteAllFiles();
      res.status(200).json({ message: "All files deleted successfully." });
  } catch (error) {
      console.error("Error deleting all files:", error);
      res.status(500).json({ message:"Failed to process request", error: error.message });
  }
});

module.exports = router;