import { Link } from "react-router-dom"

export const UserStatistics = () => {
    return (
        <>
        <p>The user's Statistics will be displayed on this page ...</p>
        <Link to="/home">
            <button>Go Back</button>
        </Link>
        </>
    )
}