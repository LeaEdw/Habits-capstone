// CSS Imports


// All other Imports// CSS Imports
import "./Profile.css";

// All other Imports
import { getTaskByUserId } from "../../services/taskFetcher";
import { useEffect, useState } from "react";

const getFormattedDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getLastTwentyEightDates = () => {
  const dates = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(getFormattedDate(d));
  }

  return dates;
};

export const TwentyEightData = () => {
  // Get the data for the past seven days
  // Establish the date range
  // Only fetch the data within the date range

  const [userTasks, setUserTasks] = useState([]);
  const [pastTwentyEightData, setPastTwentyEightData] = useState([]);
  const [successfulDays, setSuccessfulDays] = useState(0);

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

  const now = new Date();
  const twentyEightDaysInMS = 28 * 24 * 60 * 60 * 1000;
  const twentyEightDaysAgoTimestamp = now.getTime() - twentyEightDaysInMS;

  const filteredTasks = userTasks.filter((item) => {
    const itemDate = new Date(item.dateCreated);
    const itemTimestamp = itemDate.getTime();

    const isRecent = itemTimestamp >= twentyEightDaysAgoTimestamp;
    const isNotFuture = itemTimestamp <= now.getTime();

    return isRecent && isNotFuture;
  });
  // Calculate the percentage of tasks completed for each day
  // For each day find the rate of tasks completed: complete task / total task for the given day

  const pastTwentyEightCompletion = () => {
    const tasksByDay = filteredTasks.reduce((acc, task) => {
      const dateKey = getFormattedDate(task.dateCreated);

      if (!acc[dateKey]) {
        acc[dateKey] = { total: 0, completed: 0 };
      }
      acc[dateKey].total += 1;
      if (task.completedStatus) {
        acc[dateKey].completed += 1;
      }

      return acc;
    }, {});

    const lastTwentyEightDays = getLastTwentyEightDates();
    let dailyData = [];
    let successfulCount = 0;

    lastTwentyEightDays.forEach((dateKey) => {
      const stats = tasksByDay[dateKey] || { total: 0, completed: 0 };
      let percentage = 0;

      if (stats.total > 0) {
        percentage = (stats.completed / stats.total) * 100;
      }
      if (percentage > 0) {
        successfulCount += 1;
      }
      dailyData.push({
        date: dateKey,
        percentage: Math.round(percentage),
      });
    });

    setPastTwentyEightData(dailyData);
    setSuccessfulDays(successfulCount);
  };

  useEffect(() => {
    pastTwentyEightCompletion();
  }, [userTasks]);

  // Assign the color for the percentages
  // Each color will cover a range 0%

  const getColorStyle = (percentage) => {
    if (percentage === null || percentage === undefined) {
      return { backgroundColor: "black" };
    }

    if (percentage === 0) {
      return { opacity: 0 };
    } else if (percentage > 0 && percentage < 25) {
      return { opacity: 0.2 };
    } else if (percentage >= 25 && percentage < 50) {
      return { opacity: 0.4 };
    } else if (percentage >= 50 && percentage < 75) {
      return { opacity: 0.6 };
    } else if (percentage >= 75 && percentage < 100) {
      return { opacity: 0.8 };
    } else if (percentage === 100) {
      return { opacity: 1.0 };
    }
  };

  const tasksByDay = filteredTasks.reduce((acc, task) => {
    const dateKey = getFormattedDate(task.dateCreated);

    if (!acc[dateKey]) {
      acc[dateKey] = { total: 0, completed: 0 };
    }
    acc[dateKey].total += 1;
    if (task.completed) {
      acc[dateKey].completed += 1;
    }
    return acc;
  }, {});

  return (
    <div className="stat-container">
      <div className="text-data">
        <h2 className="data-text">Past 28 Days</h2>
        <div>{successfulDays}/28</div>
        <div className="text">Days</div>
      </div>
      <div>
        <div className="theDots">
          {pastTwentyEightData.map((dayData, index) => {
            const dayStats = tasksByDay[dayData.date];
            const hasTasks = dayStats && dayStats.total > 0;

            let dotStyle = {};
            let circleStyle = {};
            if (!hasTasks) {
              circleStyle = "fa-regular fa-circle";
              dotStyle = { color: "grey" };
            } else {
              const baseColor = "#0a6bfb";
              (circleStyle = "fa-solid fa-circle"),
                (dotStyle = {
                  color: baseColor,
                  ...getColorStyle(dayData.percentage),
                });
            }
            return (
              <div
                key={index}
                className="eachDot"
                title={`${dayData.date}: ${dayData.percentage}% completed`}
              >
                <i className={circleStyle} style={dotStyle}></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// The Dots will be subject to change. This component will always get the past seven days. The seventh day is the present day and
// reaches back from day
