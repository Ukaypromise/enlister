import "dotenv/config";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from "./models/note";
import noteRoutes from "./routes/notes";

const app = express();
app.use("/api/notes", noteRoutes);


app.use((req, res, next) => {
  next(Error("Error fetching notes"));
});
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});
export default app;
