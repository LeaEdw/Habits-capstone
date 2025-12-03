import "./Button.css";
import { useNavigate } from "react-router-dom";

export const SaveButton = () => {
  const navigate = useNavigate();

  const handleSave = () => navigate("/home");
  return (
    <>
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </>
  );
};

export const UpdateButton = () => {
  const navigate = useNavigate();

  const handleUpdate = () => navigate("/home");
  return (
    <>
      <button className="save-btn" onClick={handleUpdate}>
        Update
      </button>
    </>
  );
};
