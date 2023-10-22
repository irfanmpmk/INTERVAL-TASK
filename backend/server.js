import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.js";
import { db } from "./db.js";

const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//const port = process.env.PORT || 8082;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
  // const q = "INSERT INTO tasks (`image`) file = ?";

  // db.query(q, [image], (err, result) => {
  //   if (err) return res.json({ Message: "Error" });
  //   return res.status(200).json({ Status: "Success" });
  // });
});

app.use("/api/tasks", taskRoutes);

app.listen(8080, () => {
  console.log("Server is Running on 8080");
});
