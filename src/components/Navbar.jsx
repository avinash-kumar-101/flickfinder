import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="logo">FlickFinder</div>

      <div className="links">
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/search" className={isActive("/search")}>Search</Link>
        <Link to="/favorites" className={isActive("/favorites")}>Favorites</Link>
      </div>
    </nav>
  );
}