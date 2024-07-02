import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import { read } from "./index.js";

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = "uploads/";
  
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, "uploaded_file" + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

app.post("/send", upload.single("file"), async (request, response) => {
  try {
    const data = await read();
    response.json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).send("Error reading data from server.");
  }
});

app.listen(4000, () => console.log("Server is running on 4000 PORT"));
