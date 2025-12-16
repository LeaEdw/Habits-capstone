// CSS Styling
import "./Task.css";

// Imports
import { useEffect, useState } from "react";
import { getTaskByUserId } from "../../services/taskFetcher";

export const EditTaskList = ({ onTaskSelect }) => {
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


  const handleTaskSelection = (taskId) => {
    const selectedTask = dailyTasks.find((task) => task.id === taskId);

    if (selectedTask) {
      onTaskSelect(selectedTask);
    }
  };

  return (
    <div className="edit-overflow">
      <div className="tasklist-container">
        <div className="task-field">
          {dailyTasks.map((taskObject) => {
            return (
              <div className="task-item" key={taskObject.id}>
                <input
                  type="checkbox"
                  id={`task-${taskObject.id}`}
                  name="task"
                  checked={taskObject.completedStatus}
                  readOnly
                  className="task-edit"
                />
                <label
                  className="task-text selectEachTask"
                  onClick={() => handleTaskSelection(taskObject.id)}
                >
                  {taskObject.taskName}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

//This page control the 'read-only' task where users can click to select a task to edit.
