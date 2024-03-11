// EditName.js
import { useDispatch, useSelector } from "react-redux";
import "./editname.css";
import { putNewUserName } from "../../redux/actions/user.action";
import { useState } from "react";

export default function EditName({ closeModal }) {
  const dispatch = useDispatch();

  const [newUserName, setNewUserName] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(putNewUserName(newUserName));
    setNewUserName("");
  };

  const isDisabled = true;

  const fistName = useSelector((state) => state.user.userProfile?.firstName);
  const lastName = useSelector((state) => state.user.userProfile?.lastName);
  const userName = useSelector((state) => state.user.userProfile?.userName);

  const handleNewUserName = (e) => setNewUserName(e.target.value);

  return (
    <div className="edit-user">
      <h2>Edit user info</h2>
      <form className="form" onSubmit={handleSubmitForm}>
        <div className="input-text">
          <label htmlFor="UserName">User name:</label>
          <input
            type="text"
            id="UserName"
            placeholder={userName}
            value={newUserName}
            onChange={handleNewUserName}
          />
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
