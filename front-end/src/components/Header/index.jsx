import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "/img/argentBankLogo.webp";
import { logoutUser } from "../../redux/reducers/userReducer";
import "./header.css";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const username = useSelector(
    (state) =>
      state.user.userProfile?.userName ||
      `${state.user.userProfile?.firstName} ${state.user.userProfile?.lastName}`
  );

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div className="user-logout">
        {isAuthenticated ? (
          <NavLink to="/SignIn" className="main-nav-item">
            <div className="user-logout">
              <p className="main-nav-name">{username}</p>
              <button className="main-nav-logout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Logout
              </button>
            </div>
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
