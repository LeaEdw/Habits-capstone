import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
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

        navigate("/");
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
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <input
              className="form-control"
              type="date"
              id="start"
              name="trip-start"
              value="Birthdate"
            />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <div>
            <button type="submit" className="btn-secondary">
              Save and Login
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
