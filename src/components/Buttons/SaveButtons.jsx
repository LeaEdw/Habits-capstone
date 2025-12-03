import "./Button.css";
import { useNavigate } from "react-router-dom";

export const SaveButton = ({onClick}) => {
  return (
    <>
      <button className="save-btn" onClick={onClick}>
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
