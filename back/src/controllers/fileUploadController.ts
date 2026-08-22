import type { NextFunction, Request, Response } from "express";

export const fileUploadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ succes: false, message: "No file uploaded" });
    }

    res.status(200).json({ message: "File caught!" });
    console.log("get file");
  } catch (error) {
    next(error);
  }
};
