import { Link } from "react-router-dom";
import "./Button.css"

export const ViewStats = () => {
  return (
    <Link to={"/user_statistics"}>
      <button className="round-btn">View Stats</button>
    </Link>
  );
};
