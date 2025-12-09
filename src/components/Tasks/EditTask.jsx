import { useState } from "react";
import { CancelButton } from "../Buttons/CancelButton";
import { UpdateButton } from "../Buttons/SaveButtons";
import { EditTaskList } from "./ReadOnlyTaskList";
import { deleteTask, updateTask } from "../../services/taskFetcher";
import { CategoryDropdown } from "../Dropdowns/categoryDropdown";
import { TaskTab } from "./TaskTab";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../Buttons/DeleteButton";

const initialEditState = {
  id: 0,
  taskName: "",
  categoryId: 0,
};

export const EditTask = () => {
  const navigate = useNavigate();
  const [taskToEdit, setTaskToEdit] = useState(initialEditState);
  const [refreshTasks, setRefreshTasks] = useState(0);

  const handleNameChange = (event) => {
    setTaskToEdit({
      ...taskToEdit,
      taskName: event.target.value,
    });
  };

  const handleCategoryChange = (newCategoryId) => {
    setTaskToEdit({
      ...taskToEdit,
      categoryId: newCategoryId,
    });
  };

  const handleSelectedTask = (taskObject) => {
    setTaskToEdit({
      id: taskObject.id,
      taskName: taskObject.taskName,
      categoryId: taskObject.categoryId,
    });
  };

  const editExistingTask = async (e) => {
    e.preventDefault();

    if (taskToEdit.id === 0) {
      alert("Please select a task to edit before updating...");
      return;
    }

    if (!taskToEdit.taskName || taskToEdit.taskName.trim() === "") {
      alert("Task name cannot be empty.");
      return;
    }

    if (taskToEdit.categoryId === 0) {
      alert("Please select a category");
      return;
    }

    try {
      await updateTask(taskToEdit);

      setRefreshTasks((prev) => prev + 1);
      alert("Task info updated successfully!");
      navigate("/home");

      setTaskToEdit(initialEditState);
    } catch (error) {
      console.error("Failed to update tasks:", error);
      alert("Failed to update tasks.");
      return;
    }
  };

  const deleteSelectedTask = async (e) => {
    e.preventDefault();

    if (taskToEdit.id === 0) {
      alert("Select task to delete.");
    }

    const confirmed = window.confirm("Are you sure you want to delete the selected task?");

    if(!confirmed){return;}
    try {
      await deleteTask(taskToEdit.id);

      setTaskToEdit(initialEditState)

      setRefreshTasks((prev) => prev + 1);
      alert("Task deleted successfully!")
    } catch (error) {
      "Failed to delete selection:", error;
    }
  };

  return (
    <>
      <div className="pageContainer">
        <div className="left-side-items">
          <h1>... Select Task to Edit</h1>
          <div className="task-form-container">
            <fieldset>
              <input
                type="text"
                className="newTask-name"
                placeholder="Select a task from list"
                name="taskName"
                value={taskToEdit.taskName}
                onChange={handleNameChange}
              />
            </fieldset>{" "}
            <CategoryDropdown
              value={taskToEdit.categoryId}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="button-group">
            <CancelButton />
            <UpdateButton onClick={editExistingTask} />
            <DeleteButton onClick={deleteSelectedTask}/>
          </div>
        </div>

        <section className="taskList-container">
          <div className="tasktab-container">
            <TaskTab />
          </div>
          <EditTaskList
            onTaskSelect={handleSelectedTask}
            refreshTrigger={refreshTasks}
          />
        </section>
        <p>Tasks cannot be marked as completed on this page.</p>
      </div>
    </>
  );
};

// This is the main page the generates all of the html for the edit task page.
