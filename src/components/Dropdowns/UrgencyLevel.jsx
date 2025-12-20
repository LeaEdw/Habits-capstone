import "./Dropdowns.css";

import { useEffect, useState } from "react";
import { getTaskUrgency } from "../../services/categoryFetcher";

export const UrgencyDropdown = ({ value, onChange }) => {
  const [urgency, setUrgency] = useState([]);

  useEffect(() => {
    const fetchUrgency = async () => {
      try {
        const allUrgencyLevelsArray = await getTaskUrgency();
        setUrgency(allUrgencyLevelsArray);
      } catch (error) {
        console.error("Failed to fetch urgency levels", error);
      }
    };
    fetchUrgency();
  }, []);

  const handleUrgencySelection = (event) => {
    const urgencyId = parseInt(event.target.value);

    if (onChange) {
      onChange(urgencyId);
    }
  };

  return (
    <div>
      <select
        className="small-dropdown"
        onChange={handleUrgencySelection}
        name="urgencyId"
        value={value}
      >
        <option value={0} disabled>
          Select Urgency
        </option>
        {urgency.map((urgencyObject) => {
          return (
            <option key={urgencyObject.id} value={urgencyObject.id}>
              {urgencyObject.urgency}
            </option>
          );
        })}
      </select>
    </div>
  );
};
