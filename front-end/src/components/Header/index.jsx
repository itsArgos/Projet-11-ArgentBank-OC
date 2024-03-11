import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "/img/argentBankLogo.webp";
import { logoutUser } from "../../redux/reducers/userReducer";
import "./header.css";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = () => {
    navigate("/Profile");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/SignIn");
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
          <div className="main-nav-item">
            <div className="user-logout">
              <i className="fa fa-user-circle"></i>
              <p className="main-nav-name" onClick={profile}>
                {username}
              </p>
              <a className="main-nav-logout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                <p>Logout</p>
              </a>
            </div>
          </div>
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
