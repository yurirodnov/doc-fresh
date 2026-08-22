import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes/fileUploadRoute";

export const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello!" });
});

app.use("/api", router);
