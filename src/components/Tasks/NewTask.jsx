// CSS import: 
import "./Task.css"

// All other imports:
import { useEffect, useState } from "react";
import { CategoryDropdown } from "../../Dropdowns/categoryDropdown";
import { CancelButton } from "../Buttons/CancelButton";
import { SaveButton } from "../Buttons/SaveButtons";
import { createTask } from "../../services/taskFetcher";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";



export const NewTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    taskName: "",
    userTaskListId: 0,
    categoryId: 0,
    dateCompleted: "",
    completedStatus: false,
    userId: 0,
  });

  useEffect(() => {
    const habitsUser = localStorage.getItem("habits_user");

    if (habitsUser) {
      const userObject = JSON.parse(habitsUser);
      const userId = userObject.id;

      const fetchUserDetails = async () => {
        try {
          const user = await getUserById(userId);

          if (user) {
            setTask((prevTask) => ({
              ...prevTask,
              userId: user.id,
              user: user.username,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      };
      fetchUserDetails();
    }
  }, []);

  const handleNewTaskInput = (e) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === "categoryId" ? parseInt(value) : value,
    }));
  };

  const createNewTask = (e) => {
    e.preventDefault();

    if (task.taskName === "") {
      window.alert("Please give the task a title to continue.");
      return;
    }

    if (task.categoryId === 0) {
      window.alert("Please select a category from the list to continue");
      return;
    }
    const newTask = {
      ...task,
      dateCompleted: new Date(),
    };
    createTask(newTask).then(() => {
      navigate("/home");
    });
  };

  return (
    <>
      <h1>Create a New Task</h1>
      <div className="task-form-container">
        <fieldset>
          <input
            type="text"
            className="newTask-name"
            placeholder="Task Title"
            name="taskName"
            value={task.taskName}
            onChange={handleNewTaskInput}
            required
          />
        </fieldset>
        <CategoryDropdown onChange={handleNewTaskInput} />
      </div>
      <div className="button-group">
          <CancelButton />
          <SaveButton onClick={createNewTask} />
      </div>
    </>
  );
};
