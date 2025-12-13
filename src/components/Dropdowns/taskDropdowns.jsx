import "./Dropdowns.css";
import { getTaskByUserId } from "../../services/taskFetcher";
import { useEffect, useState } from "react";

export const TaskDropDown = ({value, onChange}) => {
  const [tasks, setTasks] = useState([]);
  const userObject = JSON.parse(localStorage.getItem("habits_user"));
  const userId = userObject.id;

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const allTasksArray = await getTaskByUserId(userId);
        setTasks(allTasksArray);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      }
    };
    fetchAllTasks();
  }, []);

    const handleTaskChange = (event) => {
    const taskId = parseInt(event.target.value);

    if (onChange) {
      onChange(taskId);
    }
  };


    return (
    <div>
      <select
        className="task-dropdown"
        onChange={handleTaskChange}
        name="taskId"
        value={value}
      >
        <option value={0} disabled>
          Select a Task
        </option>
        {tasks.map((taskObject) => {
          return (
            <option key={taskObject.id} value={taskObject.id}>
              {taskObject.taskName}
            </option>
          );
        })}
      </select>
    </div>
  );

};
