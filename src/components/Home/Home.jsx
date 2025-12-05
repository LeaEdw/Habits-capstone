import "./Home.css";
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";
import { Logout } from "../Auth/Logout";
import { CreateNewButton } from "../Buttons/CreateNewButton";
import { EditTaskButton } from "../Buttons/EditButton";
import { ViewStats } from "../Buttons/ViewStatsButton";
import { TaskList } from "../Tasks/TaskList";
import { getTaskByUserId } from "../../services/taskFetcher";

export const Home = () => {
  const [user, setUser] = useState([]);
  const [userTasks, setUserTasks] = useState([]);

  const userObject = JSON.parse(localStorage.getItem("habits_user"));

  useEffect(() => {
    getUserById(userObject.id).then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    getTaskByUserId(userObject.id).then((data) => {
      setUserTasks(data);
    });
  }, [userTasks]);

  const uncompletedTask = userTasks.filter(task => !task.completedStatus);
  const uncompletedCount = uncompletedTask.length;

  const hasTasks = userTasks.length > 0;
  
  const getTaskCountMessage = () => {
    if (!hasTasks) {
      return "It's a bit empty... create a task."
    }

    if (uncompletedCount === 0) {
      return "All tasks complete. Great job!"
    }

    const taskWord = uncompletedCount === 1 ? "task" : "tasks";
    return `You have ${uncompletedCount} ${taskWord} to complete`
  }

  return (
    <>
      <div className="pageContainer">
        <div className="left-sideItems">
          <section className="welcomeProgress">
            <h1 className="userGreeting">Hey, {user.username}</h1>
            <p>{hasTasks ? `Task Data will be here.` : "Psst. Create and complete some tasks to get data."}</p>
          </section>
          <section className="buttons-container">
            <CreateNewButton />
            <EditTaskButton disabled={!hasTasks} />
            <Logout />
          </section>
        </div>
        <section className="taskList-container">
          <div className="taskField">
            <p className="taskData">
              {getTaskCountMessage()}
            </p>
            <TaskList userTasks={userTasks} setUserTasks={setUserTasks} />
          </div>
          <ViewStats />
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
