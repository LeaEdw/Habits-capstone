//CSS Imports
import "./Profile.css";
import "../Buttons/Button.css"

// All other imports
import { Link, useNavigate } from "react-router-dom";
import { SaveButton, UpdateButton } from "../Buttons/SaveButtons";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../services/userService";
import { GoBackButton } from "../Buttons/GoBackButton";

const initialEditState = {
  id: 0,
  username: "",
  email: "",
  phoneNumber: "",
  birthdate: "",
};

export const UserProfile = () => {
  const navigate = useNavigate();
  const [infoToEdit, setInfoToEdit] = useState(initialEditState);

  const userObject = JSON.parse(localStorage.getItem("habits_user"));
  const userId = userObject.id;

  const handleChange = (event) => {
    const { id, value} = event.target;
    setInfoToEdit((prevInfo) => ({
        ...prevInfo,
        [id]: value,
    }));
  };

  const editExistingUser = async (e) => {
    e.preventDefault();

    if (
      !infoToEdit.username ||
      infoToEdit.username.trim() === "" ||
      !infoToEdit.email ||
      infoToEdit.email.trim() === "" ||
      !infoToEdit.phoneNumber || 
      infoToEdit.phoneNumber.trim === "" ||
      !infoToEdit.birthdate ||
      infoToEdit.birthdate.trim === ""
    ) {
      alert("Fields cannot be empty.");
      return;
    }

    try {
        const dataToSave = {...infoToEdit, id: userId};
        await updateUser(dataToSave);
        alert("User Information updated successfully.");
    } catch (error) {
        "Failed to update user information."
    }
  };

  useEffect(() => {
    getUserById(userObject.id).then((data) => {
      setInfoToEdit({
        id: data.id,
        username: data.username || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        birthdate: data.birthdate || ""
      });
    });
  }, [userId]);

  return (
    <>
      <div>
        <fieldset>
          <div>
            <div className="form-floating mb-3">
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="username"
                value={infoToEdit.username}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                onChange={handleChange}
                className="form-control"
                id="email"
                value={infoToEdit.email}
                required
              />
              <label htmlFor="user-email">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                onChange={handleChange}
                className="form-control"
                id="phoneNumber"
                value={infoToEdit.phoneNumber}
                required
                maxLength="12"
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="date"
                onChange={handleChange}
                className="form-control"
                id="birthdate"
                value={infoToEdit.birthdate}
                required
              />
              <label htmlFor="birthdate">Birthdate</label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="buttons-container">
        <GoBackButton/>
        <UpdateButton onClick={editExistingUser} />
      </div>
    </>
  );
};
