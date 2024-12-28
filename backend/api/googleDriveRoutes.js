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
    res.status(500).send("Failed to process request");
  }

})

router.post("/upload", async (req, res) => {
  try {
    const { file } = req.files;

    // Upload gambar ke Google Drive
    const driveLink = await uploadFile(file);

    // Panggil Oracle untuk update link ke Smart Contract
    const txHash = await oracleUploadAsset(driveLink, file.name.split('.').slice(0, -1).join('.'));

    res.status(200).json({
      message: "File uploaded and Smart Contract updated!",
      transactionHash: txHash,
    });
  } catch (error) {
    await deleteFileFromLink(driveLink)
    console.error("Error:", error);
    res.status(500).send("Failed to process request");
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
    res.status(500).send("Failed to fetch assets");
  }
});

router.delete("/files", async (req, res) => {
  try {
      await deleteAllFiles();
      res.status(200).json({ message: "All files deleted successfully." });
  } catch (error) {
      console.error("Error deleting all files:", error);
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;