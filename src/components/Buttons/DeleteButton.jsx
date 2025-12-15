// CSS Import
import "./Button.css"

export const DeleteButton = ({ onClick }) => {

  const handleDelete = async (e) => {
    await onClick(e);

  };
  return (
    <>
      <button className="delete-btn round-btn" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};