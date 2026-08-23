// back/src/controllers/fileUploadController.ts

import type { NextFunction, Request, Response } from "express";
import { checkFile } from "../services/fileCheckerService";

export const fileUploadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ succes: false, message: "No file uploaded" });
    }

    const { path, originalname, mimetype } = req.file;

    const textFromFile = await checkFile(path, originalname, mimetype);

    res.status(200).json({ message: "Success!", result: textFromFile });
    console.log("get file");
  } catch (error) {
    next(error);
  }
};
