import { Link } from "react-router-dom";
import "./Button.css"


export const EditTaskButton = () => {
  return (
    <>
      <Link to={"/edit_post"}>
        <button className="editTask-btn home-btn">Edit Existing Tasks</button>
      </Link>
    </>
  );
};
