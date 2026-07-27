import Note from "../model/Note.js";

import mongoose from "mongoose";

export const getAllNotes = async (_, response) => {
  try {
    const data = await Note.find().sort({createdAt:-1});  //-1 will sort to newest first
    response.status(200).json(data);
  } catch (error) {
    console.error(`Error in getAllNotes controller ${error}`);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (request, response) => {
  try {
    const id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return response.status(400).json({ message: `Invalid id: ${id}` });
    const noteData = await Note.findById(id);
    if (!noteData)
      return response
        .status(404)
        .json({ message: `Cannot find note id: ${id}` });
    response.status(200).json(noteData);
  } catch (error) {
    console.error(`Error in getNoteById controller ${error}`);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const postNote = async (request, response) => {
  try {
    const { title, content } = request.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    response
      .status(201)
      .json({ message: "Note created successfully", newNote });
  } catch (error) {
    console.error(`Error in postNote controller ${error}`);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (request, response) => {
  try {
    const id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return response.status(400).json({ message: `Invalid id: ${id}` });
    const { title, content } = request.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true },
    );
    if (!updatedNote)
      return response
        .status(404)
        .json({ message: `Cannot find note id: ${id}` });
    response
      .status(200)
      .json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error(`Error in updateNote controller ${error}`);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (request, response) => {
  try {
    const id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return response.status(400).json({ message: `Invalid id: ${id}` });
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote)
      return response
        .status(404)
        .json({ message: `Cannot find note id: ${id}` });
    response.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteNote controller ${error.stack}`);
    response.status(500).json({ message: "Internal server error" });
  }
};
