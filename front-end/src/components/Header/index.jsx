import "./header.css";
import logo from "../../assets/img/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
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
        <NavLink to="/SignIn" className="main-nav-item" href="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
