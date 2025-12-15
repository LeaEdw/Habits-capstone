// CSS Imports
import "./Home.css";

// JSX Imports
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";
import { Logout } from "../Auth/Logout";
import { CreateNewButton } from "../Buttons/CreateNewButton";
import { EditTaskButton } from "../Buttons/EditButton";
import { ViewStats } from "../Buttons/ViewStatsButton";
import { TaskList } from "../Tasks/TaskList";
import { getTaskByUserId } from "../../services/taskFetcher";
import { TaskTab } from "../Tasks/TaskTab";
import { ToggleDeleteButton } from "../Buttons/ToggleDelete";
import { ProgressBar } from "react-bootstrap";
import { UserIcon } from "../Buttons/ProfileButton";

export const Home = () => {
  const [user, setUser] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const userObject = JSON.parse(localStorage.getItem("habits_user"));
  const userId = userObject.id;

  const fetchTasks = () => {
    getTaskByUserId(userId).then((data) => {
      setUserTasks(data);
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    getUserById(userObject.id).then((data) => {
      setUser(data);
    });
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  useEffect(() => {
    const getTodayDateString = () => {
      return new Date().toISOString().slice(0, 10);
    };

    const todayDate = getTodayDateString();

    const filteredTasks = userTasks.filter((task) => {
      if (task.dateCreated) {
        const taskDate = new Date(task.dateCreated).toISOString().slice(0, 10);
        return taskDate === todayDate;
      }
      return false;
    });

    setDailyTasks(filteredTasks);
  }, [userTasks]);

  const uncompletedTask = dailyTasks.filter((task) => !task.completedStatus);
  const uncompletedCount = uncompletedTask.length;

  const hasTasks = dailyTasks.length > 0;

  const getTaskCountMessage = () => {
    if (!hasTasks) {
      return "No tasks scheduled for today. Create a new one!";
    }

    if (uncompletedCount === 0) {
      return "All tasks complete. Great job!";
    }

    const taskWord = uncompletedCount === 1 ? "task" : "tasks";
    return `You have ${uncompletedCount} ${taskWord} to complete.`;
  };

  const getDailyProgress = () => {
    const allTaskCount = dailyTasks.length;
    const completedTask = dailyTasks.filter((task) => task.completedStatus);
    const completedCount = completedTask.length;

    if (allTaskCount === 0) {
      return 0;
    }
    const taskRatio = completedCount / allTaskCount;
    return taskRatio;
  };

  const dailyPercentage = () => {
    const ratio = getDailyProgress();
    const percentage = ratio * 100;

    return parseFloat(percentage).toFixed(1);
  };

  return (
    <>
      <div className="pageContainer">
        <div className="left-sideItems">
          <section className="welcomeProgress">
            <div className="top-line">
              <h1 className="userGreeting">Hey, {user.username}</h1>
              <div className="profile-nav-button"><UserIcon /></div>
            </div>
            <h3>Current Task Progress: </h3>
            <div className="dailyPercentage">{dailyPercentage()}%</div>
            <div>
              {hasTasks ? (
                <ProgressBar now={dailyPercentage()} />
              ) : (
                "Psst. Create your tasks for today!"
              )}
            </div>
          </section>
          <section className="nav-buttons-container">
            <CreateNewButton />
            <EditTaskButton disabled={!hasTasks} />
            <Logout />
          </section>
        </div>
        <section className="taskList-container">
          <div className="tasktab-container">
            <TaskTab />
          </div>
          <div className="taskField">
            <p className="taskData">{getTaskCountMessage()}</p>
            <TaskList
              userTasks={dailyTasks}
              setUserTasks={setUserTasks}
              onTaskCompletionChange={fetchTasks}
              isEditing={isEditing}
            />
          </div>
          <section className="tasklist-buttons-container">
            <ViewStats />
            <ToggleDeleteButton isEditing={isEditing} onToggle={toggleEdit} />
          </section>
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
