import "./Button.css";

export const ToggleDeleteButton = ({ isEditing, onToggle }) => {
  return (
    <>
      <button className="round-btn" onClick={onToggle}>
        {isEditing ? "Done Editing" : "Edit List"}
      </button>
    </>
  );
};

export const EachDeleteButton = ({ isVisible, taskId, onDelete }) => {
  const style = {
    display: isVisible ? "block" : "none",
  };
  return (
    <>
      <button
        id="eachDeleteIcon"
        className="delete-icon"
        style={style}
        onClick={() => onDelete(taskId)}
      >
        <i className="fa-solid fa-circle-minus" />
      </button>
    </>
  );
};
