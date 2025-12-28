import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import MovieDetails from "../pages/MovieDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}



