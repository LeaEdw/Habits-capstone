import { Link } from "react-router-dom";
import "./Button.css";

export const GoBackButton = () => {
  return (
    <Link to="/home">
      <button className="home-btn">Go Back</button>
    </Link>
  );
};
