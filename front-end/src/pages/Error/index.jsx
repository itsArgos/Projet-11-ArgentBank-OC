import Header from "../../components/Header";
import { NavLink } from "react-router-dom";
import "./error.css";
import Footer from "../../components/Footer";

export default function Error() {
  return (
    <div>
      <Header />
      <main className="error">
        <h1 className="error-404">404</h1>
        <p className="error-text">Oups! This page doesn't exist.</p>
        <NavLink to={"/"} className="error-navlink">
          Return to homepage
        </NavLink>
      </main>
      <Footer />
    </div>
  );
}
