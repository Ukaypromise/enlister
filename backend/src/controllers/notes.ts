import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes:RequestHandler= async (req, res, next) => {
  try {
    // throw Error("Error fetching notes");
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}