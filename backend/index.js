require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const googleDriveRouter = require("./api/googleDriveRoutes");
const githubRouter = require("./api/githubRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// Route untuk upload file
app.use("/api", googleDriveRouter);
app.use("/api", githubRouter);

// Route default
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
