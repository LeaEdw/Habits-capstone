// CSS Import
import "./Button.css"

export const DeleteButton = ({ onClick }) => {

  const handleDelete = async (e) => {
    await onClick(e);

  };
  return (
    <>
      <button className="delete-btn home-btn" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};