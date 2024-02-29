import { useState } from "react";
import Account from "../../components/Account";
import "./user.css";
import EditName from "../../components/EditName";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditName = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && <EditName closeModal={handleCloseModal} />}
      <main className="main bg-dark-profile">
        <div className="header">
          <h1>
            Welcome back <br />
          </h1>
          <button className="edit-button" onClick={handleEditName}>
            Edit Name
          </button>
        </div>
        <Account />
      </main>
    </div>
  );
}
