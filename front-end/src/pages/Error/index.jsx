import { NavLink } from "react-router-dom";
import "./error.css";

export default function Error() {
  return (
    <main className="error">
      <h1 className="error-404">404</h1>
      <p className="error-text">Oups! This page doesn't exist.</p>
      <NavLink to={"/"} className="error-navlink">
        Return to homepage
      </NavLink>
    </main>
  );
}
