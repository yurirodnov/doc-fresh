import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
export const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello!" });
});
