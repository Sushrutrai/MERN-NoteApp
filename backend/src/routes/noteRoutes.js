import express from "express";
import {
  deleteNote,
  getAllNotes,
  postNote,
  updateNote,
  getNoteById,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", postNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
