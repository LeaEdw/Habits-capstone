// CSS Imports
import "./UserStats.css";

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

const getLastSevenDates = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(getFormattedDate(d));
    // const d = new Date(
    //   Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - i)
    // );

    // const year = d.getUTCFullYear();
    // const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    // const day = String(d.getUTCDate()).padStart(2, "0");

    // dates.push(`${year}-${month}-${day}`);
  }

  return dates;
};

// export const SevenData = () => {
//   // Get the data for the past seven days
//   // Establish the date range
//   // Only fetch the data within the date range

//   const [userTasks, setUserTasks] = useState([]);
//   const [pastSevenData, setPastSevenData] = useState([]);
//   const [successfulDays, setSuccessfulDays] = useState(0);

//   const userObject = JSON.parse(localStorage.getItem("habits_user"));
//   const userId = userObject.id;

//   const fetchTasks = () => {
//     getTaskByUserId(userId).then((data) => {
//       setUserTasks(data);
//     });
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [userId]);

//   const today = new Date();
//   const sixDaysAgo = new Date(today);

//   sixDaysAgo.setDate(today.getDate() - 6);
//   sixDaysAgo.setHours(0, 0, 0, 0);

//   const rangeStartTimeStamp = sixDaysAgo.getTime();

//   const filteredTasks = userTasks.filter((item) => {
//     const itemDate = new Date(item.dateCreated);
//     const itemTimestamp = itemDate.getTime();

//     return itemTimestamp >= rangeStartTimeStamp

//   });
//   // Calculate the percentage of tasks completed for each day
//   // For each day find the rate of tasks completed: complete task / total task for the given day

//   const pastSevenCompletion = () => {
//     const tasksByDay = filteredTasks.reduce((acc, task) => {
//       const dateKey = getFormattedDate(task.dateCreated);

//       if (!acc[dateKey]) {
//         acc[dateKey] = { total: 0, completed: 0 };
//       }
//       acc[dateKey].total += 1;
//       if (task.completedStatus) {
//         acc[dateKey].completed += 1;
//       }

//       return acc;
//     }, {});

//     const lastSevenDays = getLastSevenDates();
//     let dailyData = [];
//     let successfulCount = 0;

//     lastSevenDays.forEach((dateKey) => {
//       const stats = tasksByDay[dateKey] || { total: 0, completed: 0 };
//       let percentage = 0;

//       if (stats.total > 0) {
//         percentage = (stats.completed / stats.total) * 100;
//       }
//       if (percentage > 0) {
//         successfulCount += 1;
//       }
//       dailyData.push({
//         date: dateKey,
//         percentage: Math.round(percentage),
//       });
//     });

//     setPastSevenData(dailyData);
//     setSuccessfulDays(successfulCount);
//   };

//   useEffect(() => {
//     pastSevenCompletion();
//   }, [userTasks]);

//   // Assign the color for the percentages
//   // Each color will cover a range 0%

//   const getColorStyle = (percentage) => {
//     if (percentage === null || percentage === undefined) {
//       return { backgroundColor: "black" };
//     }

//     if (percentage === 0) {
//       return { opacity: 0 };
//     } else if (percentage > 0 && percentage < 25) {
//       return { opacity: 0.2 };
//     } else if (percentage >= 25 && percentage < 50) {
//       return { opacity: 0.4 };
//     } else if (percentage >= 50 && percentage < 75) {
//       return { opacity: 0.6 };
//     } else if (percentage >= 75 && percentage < 100) {
//       return { opacity: 0.8 };
//     } else if (percentage === 100) {
//       return { opacity: 1.0 };
//     }
//   };

//   const tasksByDay = filteredTasks.reduce((acc, task) => {
//     const dateKey = getFormattedDate(task.dateCreated);

//     if (!acc[dateKey]) {
//       acc[dateKey] = { total: 0, completed: 0 };
//     }
//     acc[dateKey].total += 1;
//     if (task.completedStatus) {
//       acc[dateKey].completed += 1;
//     }
//     return acc;
//   }, {});

//   return (
//     <div className="stat-container">
//       <div className="text-data">
//         <h2 className="data-text">Past 7 Days</h2>
//         <div>{successfulDays}/7</div>
//         <div className="text">Days</div>
//       </div>
//       <div>
//         <div className="theDots">
//           {pastSevenData.map((dayData, index) => {
//             const dayStats = tasksByDay[dayData.date];
//             const hasTasks = dayStats && dayStats.total > 0;

//             let dotStyle = {};
//             let circleStyle = {};
//             if (!hasTasks) {
//               circleStyle = "fa-regular fa-circle";
//               dotStyle = { color: "grey" };
//             } else {
//               const baseColor = "#0a6bfb";
//               (circleStyle = "fa-solid fa-circle"),
//                 (dotStyle = {
//                   color: baseColor,
//                   ...getColorStyle(dayData.percentage),
//                 });
//             }
//             return (
//               <div
//                 key={index}
//                 className="eachDot"
//                 title={`${dayData.date}: ${dayData.percentage}% completed`}
//               >
//                 <i className={circleStyle} style={dotStyle}></i>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

export const SevenData = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [pastSevenData, setPastSevenData] = useState([]);
  const [successfulDays, setSuccessfulDays] = useState(0);

  const userObject = JSON.parse(localStorage.getItem("habits_user"));
  const userId = userObject?.id;

  // 1. Fetch data on mount
  useEffect(() => {
    if (userId) {
      getTaskByUserId(userId).then((data) => {
        setUserTasks(data);
      });
    }
  }, [userId]);

  // 2. Process data whenever userTasks updates
  useEffect(() => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Filter tasks for the 7-day range
    const filtered = userTasks.filter((item) => {
      const itemDate = new Date(item.dateCreated);
      return itemDate >= sevenDaysAgo && itemDate <= now;
    });

    // Group by date key
    const tasksByDay = filtered.reduce((acc, task) => {
      const dateKey = getFormattedDate(task.dateCreated);
      if (!acc[dateKey]) acc[dateKey] = { total: 0, completed: 0 };

      acc[dateKey].total += 1;
      if (task.completedStatus) acc[dateKey].completed += 1;
      return acc;
    }, {});

    const lastSevenDays = getLastSevenDates();
    let successfulCount = 0;

    const dailyData = lastSevenDays.map((dateKey) => {
      const stats = tasksByDay[dateKey] || { total: 0, completed: 0 };

      // If total is 0, percentage is null (no tasks created that day)
      const percentage =
        stats.total > 0 ? (stats.completed / stats.total) * 100 : null;

      if (percentage > 0) {
        successfulCount += 1;
      }

      return {
        date: dateKey,
        percentage: percentage !== null ? Math.round(percentage) : null,
        totalTasks: stats.total,
      };
    });

    setPastSevenData(dailyData);
    setSuccessfulDays(successfulCount);
  }, [userTasks]);

  // 3. Helper for Opacity/Color (Unified with 28-day logic)
  const getColorStyle = (percentage) => {
    const baseColor = "#0a6bfb";

    if (percentage === null) return { color: "grey", opacity: 0.3 }; // No activity
    if (percentage === 0) return { color: baseColor, opacity: 0.1 }; // 0% completion

    let opacity = 0.2;
    if (percentage >= 100) opacity = 1.0;
    else if (percentage >= 75) opacity = 0.8;
    else if (percentage >= 50) opacity = 0.6;
    else if (percentage >= 25) opacity = 0.4;

    return { color: baseColor, opacity: opacity };
  };

  return (
    <div className="stat-container">
      <div className="text-data">
        <h2 className="data-text">Past 7 Days</h2>
        <div>
          {successfulDays} / 7 <span className="text">Days</span>
        </div>
      </div>
      <div className="day-labels">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>
      <div className="theDots">
        {pastSevenData.map((day, index) => {
          const isPlaceholder = day.percentage === null;
          const style = getColorStyle(day.percentage);

          return (
            <div
              key={index}
              className="eachDot"
              title={`${day.date}: ${day.percentage ?? 0}% completed (${day.totalTasks} tasks)`}
            >
              <i
                className={
                  isPlaceholder ? "fa-regular fa-circle" : "fa-solid fa-circle"
                }
                style={style}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// The Dots will be subject to change. This component will always get the past seven days. The seventh day is the present day and
// reaches back from day
