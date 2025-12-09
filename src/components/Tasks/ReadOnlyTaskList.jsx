import { useEffect, useState } from "react";
import "./Task.css";
import { getTaskByUserId } from "../../services/taskFetcher";

export const EditTaskList = ({ onTaskSelect, refreshTrigger }) => {
  const [selectTask, setSelectTask] = useState([]);
  const userObject = JSON.parse(localStorage.getItem("habits_user"));

  useEffect(() => {
    getTaskByUserId(userObject.id).then((data) => {
      setSelectTask(data);
    });
  }, [userObject.id, refreshTrigger]);

  const handleTaskSelection = (taskId) => {
    const selectedTask = selectTask.find((task) => task.id === taskId);

    if (selectedTask) {
      onTaskSelect(selectedTask);
    }
  };

  return (
    <div className="tasklist-container">
      {selectTask.map((taskObject) => {
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
