// CSS Imports
import "./Profile.css"

// All other Imports

export const SevenData = () => {


    return (
        <div className="stat-container">
            <div className="text-data">
                <h2 className="data-text">Past 7 Days</h2>
                <div>{/* placeholder: 5/7 */}</div>
                <div className="text">Days</div>
            </div>
            <div>
                <div className="theDots">
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                    <div className="eachDot"><i className="fa-regular fa-circle"></i></div>
                </div>
            </div>
        </div>
    )
}

// The Dots will be subject to change. This component will always get the past seven days. The seventh day is the present day and
// reaches back from day 7

