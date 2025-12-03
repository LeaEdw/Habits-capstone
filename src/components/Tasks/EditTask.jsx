import { CancelButton } from "../Buttons/CancelButton";
import { UpdateButton } from "../Buttons/SaveButtons";

export const EditTask = () => {
  return (
    <>
      <p>The form to edit an existing task will be here.</p>
      <div className="button-group">
        <CancelButton />
        <UpdateButton />
      </div>
    </>
  );
};
