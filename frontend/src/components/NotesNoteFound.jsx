import { Notebook, StickyNoteOff, StickyNoteX } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NotesNoteFound = () => {
  return (
    <div className="flex flex-col max-w-md justify-center text-center items-center py-16 space-y-6 mx-auto ">
      <div className="bg-primary/30 rounded-full p-8">
        <Notebook className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-200">Create your first note. Organize your thoughts.</p>
      <Link to={"/create"} className="btn ">Create your first note</Link>
    </div>
  );
};

export default NotesNoteFound;
