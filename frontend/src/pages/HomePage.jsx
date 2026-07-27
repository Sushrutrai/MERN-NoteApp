import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLImitedUi from "../components/RateLImitedUi";
import NoteCard from "../components/NoteCard";

import toast from "react-hot-toast";
import api from "../../lib/axios";
import NotesNoteFound from "../components/NotesNoteFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");

        setNotes(res.data);
        setIsRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching notes", error);
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      {isRateLimited && <RateLImitedUi />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10 tracking-tight">
            Loading notes...
          </div>
        )}
        {notes.length===0 && !isRateLimited && <NotesNoteFound/>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
