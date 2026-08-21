import dotenv from "dotenv";
import path from "path";

dotenv.config();

interface Config {
  port: number | string;
  uploadDir: string;
  allowedFileFormats: string[];
  maxFileSize: number;
}

export const config: Config = {
  port: process.env.PORT || 3000,
  uploadDir: path.join(__dirname, "..", "/uploads"),
  allowedFileFormats: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ],
  maxFileSize: 10 * 1024 * 1024,
};
