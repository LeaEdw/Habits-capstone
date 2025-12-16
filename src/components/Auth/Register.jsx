// CSS Styling Import
import "../Buttons/Button.css"
import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    birthdate: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "habits_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/home");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (event) => {
    const copy = { ...user };
    copy[event.target.id] = event.target.value;
    setUser(copy);
  };

  return (
    <main className="container-login">
      <form className="form-login" onSubmit={handleRegister}>
        <h1 className="header">Habit Tracker</h1>
        <h2>Please Register</h2>
        <fieldset className="form-group">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <input
              className="form-control"
              onChange={updateUser}
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              maxLength="12"
              required
            />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <input
              className="form-control"
              type="date"
              id="birthdate"
              name="birthdate"
              onChange={updateUser}
            />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <button type="submit" className="round-btn">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
