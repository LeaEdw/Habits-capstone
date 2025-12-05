import { useEffect, useState } from "react";
import "./Task.css";
import { getTaskByUserId } from "../../services/taskFetcher";

export const EditTaskList = () => {
  const [selectableTasklist, setSelectableTasklist] = useState([]);

  const userObject = JSON.parse(localStorage.getItem("habits_user"));

  useEffect(() => {
    getTaskByUserId(userObject.id).then((data) => {
      setSelectableTasklist(data);
    });
  }, []);

  return (
    <div className="tasklist-container">
      {selectableTasklist.map((taskObject) => {
        return (
          <div className="eachTask" key={taskObject.id}>
            <input
              type="checkbox"
              id={`task-${taskObject.id}`}
              name="task"
              checked={taskObject.completedStatus}
              readOnly
              className="task-edit"
            />
            <label htmlFor={`task-${taskObject.id}`} className="task-text">
              {taskObject.taskName}
            </label>
          </div>
        );
      })}
    </div>
  );
};
