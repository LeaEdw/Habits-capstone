import { useNavigate } from "react-router-dom";
import "./Login.css"

export const Logout = () => {
    const navigate = useNavigate()
    return (
        <>
            <button
                onClick={() => {
                    localStorage.removeItem("habits_user");
                    navigate("/", {replace: true})
                }}
            >Logout</button>
        </>
    )
}