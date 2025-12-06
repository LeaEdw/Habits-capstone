import { Link } from "react-router-dom";

export const ViewStats = () => {
  return (
    <Link to={"/user_statistics"}>
      <button className="viewStats-btn home-btn">View Statistics</button>
    </Link>
  );
};
