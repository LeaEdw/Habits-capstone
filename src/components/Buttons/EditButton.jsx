import { Link, useNavigate } from "react-router-dom";
import "./Button.css"


export const EditTaskButton = ({disabled}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!disabled) {
      navigate("/edit")
    }
  }
  return (
    <>
      <Link to={"/edit_post"}>
        <button className="cube-btn"
        onClick={handleEdit}
        disabled={disabled}>Edit Existing Tasks</button>
      </Link>
    </>
  );
};
