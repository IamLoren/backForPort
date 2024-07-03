import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/send", upload.single("file"), (request, response) => {
  try {
    const filePath = path.join(__dirname, "uploads", "uploaded_file.txt");
    
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    let data = '';
    readStream.on('data', (chunk) => {
      data += chunk;
    });

    readStream.on('end', async () => {
      try {
        const processedData = await read(data);
        response.json(processedData);
      } catch (error) {
        console.error("Error processing data:", error);
        response.status(500).send("Error processing data.");
      }
    });

    readStream.on('error', (error) => {
      console.error("Error reading file:", error);
      response.status(500).send("Error reading file.");
    });
  } catch (error) {
    console.error("Error processing request:", error);
    response.status(500).send("Error processing request.");
  }
});

app.listen(process.env.PORT || 4000, () => console.log("Server is running on 4000 PORT"));
