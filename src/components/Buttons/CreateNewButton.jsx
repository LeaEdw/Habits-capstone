import { Link } from "react-router-dom";
import "./Button.css"

export const CreateNewButton = () => {
  return (
    <Link to={"/new_post"}>
      <button className="newTask-btn home-btn">Create a New Task</button>
    </Link>
  );
};
