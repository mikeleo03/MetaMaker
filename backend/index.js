require("dotenv").config();
const cors = require("cors")
const express = require("express");
const fileUpload = require("express-fileupload");
const googleDriveRouter = require("./api/googleDriveRoutes");
const githubRouter = require("./api/githubRoutes");
const oracleRouter = require("./api/oracleRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

app.use("/api", googleDriveRouter);
app.use("/api", githubRouter);
app.use("/api", oracleRouter);

// Route default
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
