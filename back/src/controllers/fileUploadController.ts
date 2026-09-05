// back/src/controllers/fileUploadController.ts

import type { NextFunction, Request, Response } from "express";
import { checkFileService } from "../services/checkFileService";
import { removeFileService } from "../services/removeFileService";

export const fileUploadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ succes: false, message: "No file uploaded" });
    }

    const { path, originalname, mimetype } = req.file;

    const checkResult = await checkFileService(path, originalname, mimetype);

    res.status(200).json({ success: true, message: "File checked!", report: checkResult });
  } catch (error) {
    next(error);
  } finally {
    if (req.file?.path) {
      await removeFileService(req.file.path);
    }
  }
};
