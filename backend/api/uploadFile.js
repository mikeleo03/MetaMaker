const express = require("express");
const { uploadFile } = require("../service/googleDriveService");
const { callOracleToUpdateSC } = require("../service/oracleService");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { File } = req.files;

    // Upload gambar ke Google Drive
    const driveLink = await uploadFile(File);

    // Panggil Oracle untuk update link ke Smart Contract
    const txHash = await callOracleToUpdateSC(driveLink);

    res.status(200).json({
      message: "File uploaded and Smart Contract updated!",
      transactionHash: txHash,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to process request");
  }
});

module.exports = router;