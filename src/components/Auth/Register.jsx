import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    cohort: 0,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
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
        <h1 className="header">Habit Tracker App</h1>
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
              onChange={updateUser}
              type="number"
              id="phoneNumber"
              className="form-control"
              placeholder="Phone Number"
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
