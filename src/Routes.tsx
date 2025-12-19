import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/NavBar";
import PostTraditional from "./components/PostTraditional";
import RQPost from "./components/RQPost";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import Pagination from "./components/Pagination";
import InFiniteFruits from "./components/InFiniteFruits";

export const Api = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-traditional" element={<PostTraditional />} />
        <Route path="/rq-post" element={<RQPost />} />
        <Route path="/rq-post/:postId" element={<PostDetails />} />
        <Route path="/fruits" element={<Pagination />} />
        <Route path="/infinite-fruits" element={<InFiniteFruits />} />
      </Routes>
    </BrowserRouter>
  );
};
