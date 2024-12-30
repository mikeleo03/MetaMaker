require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const GithubService = require("../service/githubService");
const router = express.Router();

const githubService = new GithubService(`${process.env.PERSONAL_ACCESS_TOKEN}`);

router.post("/github-upload", async (req, res) => {
    const file = req.files?.file;

    if (!file) {
        return res.status(400).json({ message: "File and filePath are required." });
    }

    try {
        const filePath = file.name;
        const fileContent = file.data.toString("base64");
        const result = await githubService.uploadFileToRepo(filePath, fileContent);
        res.status(200).json({ message: "File uploaded successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
