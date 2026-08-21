import multer from "multer";
import path from "path";
import fs from "fs";
import { config } from "../config";
import { Request } from "express";

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, config.uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (config.allowedFileFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("This file format is not allowed. Allowed: PDF, TXT, DOC, DOCX"));
  }
};

export const multerUpload = multer({ storage, fileFilter, limits: { fileSize: config.maxFileSize } });
