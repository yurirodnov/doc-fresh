// back/src/routes/fileUploadRouter.ts

import { Router } from "express";
import { fileUploadController } from "../controllers/fileUploadController";
import { multerUpload } from "../middlewares/multer";

export const router = Router();

router.post("/upload", multerUpload.single("document"), fileUploadController);
