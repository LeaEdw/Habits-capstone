import { Link } from "react-router-dom"

export const UserStatistics = () => {
    return (
        <>
        The user's Statistics will be displayed here ...
        <Link to="/home">
            <button>Go Back</button>
        </Link>
        </>
    )
}