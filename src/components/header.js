import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import useStore from "./store"; 

function Header() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); 
    navigate("/signin"); 
  };

  return (
    <header id="h-container">
      <div className="h-container box">
        <div className="logo box">
          <div className="logo_img"></div>
        </div>
        <nav className="nav_list box">
          <ul className="lists box">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            {!user ? (
              <Link to="/signup">
                <li>Sign Up / Sign In</li>
              </Link>
            ) : (
              <>
                <li>Welcome, {user.name}</li>
                <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
