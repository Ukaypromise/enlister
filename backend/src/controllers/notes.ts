import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(404, "Invalid note ID");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface createNoteBody {
  title?: string;
  content?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  createNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  try {
    if (!title) {
      throw createHttpError(404, "Title is required");
    }
    const newNote = await NoteModel.create({
      title: title,
      content: content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
