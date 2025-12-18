import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/NavBar";
import PostTraditional from "./components/PostTraditional";
import RQPost from "./components/RQPost";
import Home from "./components/Home";

export const Api = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-traditional" element={<PostTraditional />} />
        <Route path="/rq-post" element={<RQPost />} />
      </Routes>
    </BrowserRouter>
  );
};
