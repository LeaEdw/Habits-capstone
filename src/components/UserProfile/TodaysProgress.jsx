// CSS Imports
import "./Profile.css";
// All other Imports
import { useEffect, useState } from "react";
import { getTaskByUserId } from "../../services/taskFetcher";
import { ProgressBar } from "react-bootstrap";

export const TodayStatistics = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);

  const userObject = JSON.parse(localStorage.getItem("habits_user"));
  const userId = userObject.id;

  const fetchTasks = () => {
    getTaskByUserId(userId).then((data) => {
      setUserTasks(data);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  useEffect(() => {
    const getLocalDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const todayDate = getLocalDateString(new Date());

    const filteredTasks = userTasks.filter((task) => {
      if (task.dateCreated) {
        const taskDateObject = new Date(task.dateCreated);
        const taskDate = getLocalDateString(taskDateObject);

        return taskDate === todayDate;
      }
      return false;
    });

    setDailyTasks(filteredTasks);
  }, [userTasks]);

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

    return Math.round(percentage);
  };

  return (
    <div className="stat-container">
      <h2 className="data-text">Today</h2>
      <div>
        {dailyPercentage()}% <span>Completed</span>
      </div>
      <ProgressBar className="stats-progress" now={dailyPercentage()} />
    </div>
  );
};
