import multer from "multer";
import path from "path";
import fs from "fs";
import { config } from "../config";

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}
