import { useEffect, useState } from "react";
import "./Task.css";
import { getTaskByUserId, updateTask } from "../../services/taskFetcher";

export const TaskList = ({ userTasks, onTaskCompletionChange }) => {

  const userObject = JSON.parse(localStorage.getItem("habits_user"));


  const handleCompletion = (task) => {
    const newStatus = !task.completedStatus;

    if (task.completedStatus === true && newStatus === false) {
      const confirmed = window.confirm(
        "Are you sure you want to uncheck this task? Previous data will be lost."
      );

      if (!confirmed) {
        return;
      }
    }

    const completionDate = newStatus ? new Date().toISOString() : "";

    const completedTask = {
      ...task,
      dateCompleted: completionDate,
      completedStatus: newStatus,
    };
    updateTask(completedTask).then(() => {
      if(onTaskCompletionChange) {
        onTaskCompletionChange()
      }
    })
    .catch(error => {
      console.error("Task update failed:", error)
    })
  };

  return (
    <div className="tasklist-container">
      {userTasks.map((taskObject) => {
        return (
          <div className="eachTask" key={taskObject.id}>
            <input
              type="checkbox"
              id={`task-${taskObject.id}`}
              name="task"
              checked={taskObject.completedStatus}
              onChange={() => handleCompletion(taskObject)}
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
