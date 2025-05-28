import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  return (
    <div>
       <ul className="nav">
        <li>
          <Link className="nav-item" to="/">
            signUp/login
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/journal">
            Journal
          </Link>
        </li>
        <li>
          <Link className="nav-item" to="/newentry">
           New Entry
          </Link>
        </li>
      </ul> 
    </div>
  )
}

export default Navbar