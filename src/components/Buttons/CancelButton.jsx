import { useNavigate } from "react-router-dom";
import "./Button.css"

export const CancelButton = () => {
  const navigate = useNavigate();

  const cancelConfirmation = () => {
    let text = "Unsaved changes will be lost. Continue?";
    if (confirm(text) == true) {
      navigate("/home");
    }
  };
  return <button className="cancel-btn round-btn" onClick={cancelConfirmation}>Cancel</button>;
};
