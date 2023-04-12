import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Write from "../pages/Write";
import EditWrite from "../pages/EditWrite";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Post />} />
        <Route path="/write/" element={<Write />} />
        <Route path="/write/:id" element={<EditWrite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
