import "./Task.css";

export const TaskTab = () => {
  return (
    <div className="tasktab">
      <button className="angle-button"><i className="fa-solid fa-angle-left"></i></button>
      <h2>Tasklist</h2>
      <button className="angle-button"><i className="fa-solid fa-angle-right"></i></button>
    </div>
  );
};
