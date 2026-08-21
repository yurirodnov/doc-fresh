import express, { Request, Response } from "express";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello!" });
});
