const express = require("express");
const { uploadFile, getAllFiles } = require("../service/googleDriveService");
const { callOracleToUpdateSC } = require("../service/oracleService");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { file } = req.files;

    // Upload gambar ke Google Drive
    const driveLink = await uploadFile(file);

    // Panggil Oracle untuk update link ke Smart Contract
    // const txHash = await callOracleToUpdateSC(driveLink);

    res.status(200).json({
      message: "File uploaded and Smart Contract updated!",
      transactionHash: driveLink,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to process request");
  }
});

router.get("/file", async (req, res) => {
  try {
    const files = await getAllFiles(); 
    res.status(200).json({
      message: "Files fetched successfully",
      files,
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Failed to fetch files");
  }
});

module.exports = router;