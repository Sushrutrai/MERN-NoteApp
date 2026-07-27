import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader2Icon, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        console.log(note);
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) ;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note");
      toast.error("Error deleting note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/")
    } catch (error) {
      console.log("Error saving note");
      toast.error("Failed to update ntoe");
    } finally {
      setSaving(false)
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto ">
          <div className="flex justify-between items-center ">
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeft className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline mb-6"
            >
              <Trash2 className="size-5" />
              Delete
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create new note</h2>
              <form onSubmit={handleSave}>
                <div className="form-control mb-4">
                  <label htmlFor="title" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id="title"
                    className="input input-bordered"
                    placeholder="Note title"
                    value={note.title}
                    onChange={(e)=>setNote({...note,title:e.target.value})}
                    disabled={saving}
                  />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="content" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    name=""
                    id="content"
                    className="textarea textarea-bordered h-32"
                    placeholder="Note content"
                    value={note.content}
                    onChange={(e)=>setNote({...note,content:e.target.value})}
                    disabled={saving}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary "
                    type="submit"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
