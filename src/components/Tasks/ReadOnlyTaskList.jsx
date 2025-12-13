import { useEffect, useState } from "react";
import "./Task.css";
import { getTaskByUserId } from "../../services/taskFetcher";

export const EditTaskList = ({ onTaskSelect, refreshTrigger }) => {
  const [userTasks, setUserTasks] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [selectTask, setSelectTask] = useState([]);
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


  const handleTaskSelection = (taskId) => {
    const selectedTask = dailyTasks.find((task) => task.id === taskId);

    if (selectedTask) {
      onTaskSelect(selectedTask);
    }
  };

  return (
    <div className="tasklist-container">
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
  );
};

//This page control the 'read-only' task where users can click to select a task to edit.
