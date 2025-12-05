import { CancelButton } from "../Buttons/CancelButton";
import { UpdateButton } from "../Buttons/SaveButtons";
import { EditTaskList } from "./EditTaskList";
import { TaskList } from "./TaskList";

export const EditTask = () => {
  return (
    <>
      <EditTaskList />
      <p>Tasks cannot be marked as completed on this page.</p>

      <div className="button-group">
        <CancelButton />
        <UpdateButton />
      </div>
    </>
  );
};
