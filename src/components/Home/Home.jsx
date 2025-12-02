import "./Home.css";
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../Auth/Logout";
import { CreateNewButton } from "../Buttons/CreateNewButton";
import { EditTaskButton } from "../Buttons/EditButton";


export const Home = () => {
  const [user, setUser] = useState([]);

const userObject = JSON.parse(localStorage.getItem("habits_user"))

  useEffect(() => {
    
    getUserById(userObject.id).then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <div className="pageContainer">
        <div className="left-sideItems">
          <section className="welcomeProgress">
            <h1 className="userGreeting">Hello, {user.username}</h1>
            <p className="taskData">There's no task data</p>
          </section>
          <section className="buttons-container">
            <CreateNewButton/>
            <EditTaskButton/>
            <Logout />
          </section>
        </div>
        <section className="taskList-container">
          <div className="taskField">
            <p>There's no tasks yet...</p>
          </div>
          <Link to={"/user_statistics"}><button className="viewStats-btn">View Statistics</button></Link>
          {/* <button className="edit-lists"></button> */}
        </section>
      </div>
    </>
  );
};

/* There will be two views:

    -- If the user has no tasks in the database there will be a page with some buttons disabled and greyed out.
    -- If the user has tasks in the database then everything will be enabled.

*/
