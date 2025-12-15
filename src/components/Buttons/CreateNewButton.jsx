import { Link } from "react-router-dom";
import "./Button.css"

export const CreateNewButton = () => {
  return (
    <Link to={"/new_post"}>
      <button className="cube-btn">Create a New Task</button>
    </Link>
  );
};
