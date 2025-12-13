// CSS imports
import { Link } from "react-router-dom";
import "./Button.css";

//Other imports:

export const UserIcon = () => {
  return (
    <>
      <Link to={"/profile"}>
        <i className="fa-solid fa-gear"></i>{" "}
      </Link>
    </>
  );
};
