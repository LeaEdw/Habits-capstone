import { useNavigate } from "react-router-dom";
import "./Button.css"

export const LogoutButton = () => {
    const navigate = useNavigate();
  return (
    <button
      className="home-btn"
      onClick={() => {
        localStorage.removeItem("habits_user");
        navigate("/", { replace: true });
      }}
    >
      Logout
    </button>
  );
};
