
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">FlickFinder</div>

      {/* ☰ MOBILE MENU BUTTON */}
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* LINKS */}
      <div className={`links ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/search" onClick={() => setOpen(false)}>Search</NavLink>
        <NavLink to="/favorites" onClick={() => setOpen(false)}>Favorites</NavLink>
      </div>
    </nav>
  );
}