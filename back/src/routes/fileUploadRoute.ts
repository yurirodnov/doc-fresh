// back/src/routes/fileUploadRouter.ts

import { Router } from "express";
import { fileUploadController } from "../controllers/fileUploadController";
import { multerUpload } from "../middlewares/multer";
import { rateLimiter } from "../middlewares/rateLimiter";

export const router = Router();

router.post("/upload", rateLimiter, multerUpload.single("document"), fileUploadController);
