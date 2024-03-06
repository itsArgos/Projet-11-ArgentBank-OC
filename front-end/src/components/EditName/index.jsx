// EditName.js
import { useSelector } from "react-redux";
import "./editname.css";

export default function EditName({ closeModal }) {
  const handleSubmitForm = async (e) => {
    e.preventDefault();
  };

  const isDisabled = true;

  const fistName = useSelector((state) => state.user.userProfile?.firstName);
  const lastName = useSelector((state) => state.user.userProfile?.lastName);

  return (
    <div className="edit-user">
      <h2>Edit user info</h2>
      <form className="form" onSubmit={handleSubmitForm}>
        <div className="input-text">
          <label htmlFor="UserName">User name:</label>
          <input type="text" id="UserName" />
        </div>
        <div className="input-text">
          <label htmlFor="FirstName">First name:</label>
          <input
            type="text"
            id="FirstName"
            disabled={isDisabled}
            placeholder={fistName}
          />
        </div>
        <div className="input-text">
          <label htmlFor="LastName">Last name:</label>
          <input
            type="text"
            id="LastName"
            disabled={isDisabled}
            placeholder={lastName}
          />
        </div>
        <div className="buttons">
          <button className="edit-button-modal" type="submit">
            Save
          </button>
          <button className="edit-button-modal" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
