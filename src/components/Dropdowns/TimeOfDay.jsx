import "./Dropdowns.css";

import { useEffect, useState } from "react";
import { getTimeOfDay } from "../../services/categoryFetcher";

export const TimeOfDayDropdown = ({ value, onChange }) => {
  const [time, setTime] = useState([]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const allTimeArray = await getTimeOfDay();
        setTime(allTimeArray);
      } catch (error) {
        console.error("Failed to fetch times", error);
      }
    };
    fetchTime();
  }, []);

  const handleTimeSelection = (event) => {
    const timeOfDayId = parseInt(event.target.value);

    if (onChange) {
      onChange(timeOfDayId);
    }
  };

  return (
    <div>
      <select
        className="small-dropdown"
        onChange={handleTimeSelection}
        name="timeOfDayId"
        value={value}
      >
        <option value={0} disabled>
          Time of Day
        </option>
        {time.map((timeObject) => {
          return (
            <option key={timeObject.id} value={timeObject.id}>
              {timeObject.time}
            </option>
          );
        })}
      </select>
    </div>
  );
};
