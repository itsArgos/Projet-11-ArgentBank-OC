import Account from "../../components/Account";
import "./user.css";

export default function Profile() {
  return (
    <main className="main bg-dark-profile">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <Account />
    </main>
  );
}
