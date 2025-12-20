// CSS import:
import "./Task.css";

// All other imports:
import { useEffect, useState } from "react";
import { CancelButton } from "../Buttons/CancelButton";
import { SaveButton } from "../Buttons/SaveButtons";
import { createTask } from "../../services/taskFetcher";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { CategoryDropdown } from "../Dropdowns/categoryDropdown";
import { CreateMoreButton } from "../Buttons/CreateNewButton";
import { UrgencyDropdown } from "../Dropdowns/UrgencyLevel";
import { TimeOfDayDropdown } from "../Dropdowns/TimeOfDay";

const initialTaskState = {
  taskName: "",
  userTaskListId: 0,
  categoryId: 0,
  urgencyId: 0,
  timeOfDayId: 0,
  dateCreated: "",
  dateCompleted: "",
  completedStatus: false,
  userId: 0,
};

export const NewTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState(initialTaskState);

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

  const handleCategoryChange = (newCategoryId) => {
    setTask((prevTask) => ({
      ...prevTask,
      categoryId: newCategoryId,
    }));
  };
  const handleUrgencyChange = (newUrgencyId) => {
    setTask((prevTask) => ({
      ...prevTask,
      urgencyId: newUrgencyId,
    }));
  };
  const handleTimeOfDayChange = (newTimeOfDayId) => {
    setTask((prevTask) => ({
      ...prevTask,
      timeOfDayId: newTimeOfDayId,
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
      dateCreated: new Date().toISOString(),
    };
    createTask(newTask).then(() => {
      navigate("/home");
    });
  };

  const createMoreTask = (e) => {
    e.preventDefault();

    const newTask = {
      ...task,
      dateCreated: new Date().toISOString(),
    };

    createTask(newTask).then(() => {
      setTask((prevTask) => ({
        ...initialTaskState,
        userId: prevTask.userId,
      }));
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
        <CategoryDropdown
          value={task.categoryId}
          onChange={handleCategoryChange}
        />
        <div className="doubled-dropdowns">
          <UrgencyDropdown
            value={task.urgencyId}
            onChange={handleUrgencyChange}
          />
          <TimeOfDayDropdown
            value={task.timeOfDayId}
            onChange={handleTimeOfDayChange}
          />
        </div>
      </div>
      <div className="button-group">
        <CancelButton />
        <CreateMoreButton onClick={createMoreTask} />
        <SaveButton onClick={createNewTask} />
      </div>
    </>
  );
};
