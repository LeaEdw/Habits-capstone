import { useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { Home } from "../Home/Home";
import { UserStatistics } from "../UserProfile/UserStats";
import { NewTask } from "../Tasks/newTask";
import { EditTask } from "../Tasks/editTask";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localHabitsUser = localStorage.getItem("habits_user");
    const habitsUserObject = JSON.parse(localHabitsUser);

    setCurrentUser(habitsUserObject);
  }, []);

  return (
    <>
      <Routes>
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="/new_post" element={<NewTask/>} />
          <Route path="/edit_post" element={<EditTask/>} />
          <Route path="/user_statistics" element={<UserStatistics/>} />
        </Route>
      </Routes>
    </>
  );
};
