// back/src/controllers/fileUploadController.ts

import type { NextFunction, Request, Response } from "express";
import { checkFile } from "../services/fileCheckerService";

export const fileUploadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ succes: false, message: "No file uploaded" });
    }

    const { path, originalname, mimetype } = req.file;

    const checkResult = await checkFile(path, originalname, mimetype);

    res.status(200).json({ success: true, message: "File checked!", report: checkResult });
    console.log("get file");
  } catch (error) {
    next(error);
  }
};
