import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "/img/argentBankLogo.png";
import { logoutUser } from "../../redux/reducers/userReducer";
import "./header.css";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        {isAuthenticated ? (
          <NavLink
            to="/SignIn"
            className="main-nav-item"
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out"></i>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/SignIn" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Header;
