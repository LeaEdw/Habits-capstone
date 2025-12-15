import "./Task.css";
import { deleteTask, updateTask } from "../../services/taskFetcher";
import { EachDeleteButton } from "../Buttons/ToggleDelete";

export const TaskList = ({ userTasks, onTaskCompletionChange, isEditing }) => {
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
    updateTask(completedTask)
      .then(() => {
        if (onTaskCompletionChange) {
          onTaskCompletionChange();
        }
      })
      .catch((error) => {
        console.error("Task update failed:", error);
      });
  };

  const handleDeletion = (taskId) => {
    deleteTask(taskId)
      .then(() => {
        if (onTaskCompletionChange) {
          onTaskCompletionChange();
        }
      })
      .catch((error) => {
        console.error("Task deletion failed:", error);
      });
  };

  return (
    <div className="overflow">
      {userTasks.map((taskObject) => {
        return (
          <div key={taskObject.id} className="task-item">
            {isEditing ? (
              <EachDeleteButton
                taskId={taskObject.id}
                onDelete={handleDeletion}
                isVisible={true}
              />
            ) : (
              <input
                type="checkbox"
                id={`task-${taskObject.id}`}
                name="task"
                checked={taskObject.completedStatus}
                onChange={() => handleCompletion(taskObject)}
              />
            )}

            <span className="task-content-wrapper">
              <label className="task-text">{taskObject.taskName}</label>
            </span>
          </div>
        );
      })}
    </div>
  );
};
