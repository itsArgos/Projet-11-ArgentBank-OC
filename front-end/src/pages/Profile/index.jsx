import { useEffect, useState } from "react";
import Account from "../../components/Account";
import "./user.css";
import EditName from "../../components/EditName";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditName = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const loadProfileTerminated = useSelector(
    (state) => state.user.loadProfileTerminated
  );
  const logged = useSelector((state) => state.user.logged);

  useEffect(() => {
    if (loadProfileTerminated && !logged) {
      navigate("/SignIn");
    }
  }, []);

  const username = useSelector(
    (state) =>
      state.user.userProfile?.userName ||
      `${state.user.userProfile?.firstName} ${state.user.userProfile?.lastName}`
  );

  return (
    <div>
      {modalOpen && <EditName closeModal={handleCloseModal} />}
      <main className="main bg-dark-profile">
        <div className="header">
          <h1>
            Welcome back <br /> {username}
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
