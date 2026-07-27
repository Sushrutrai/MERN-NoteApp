import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";


const App = () => {
  return (
    <div className="[background:radial-gradient(farthest-corner_at_0%_100%,#000_0%,#af8_100%)] absolute w-full min-h-full">
      {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 "/> */}
   
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/note/:id" element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
