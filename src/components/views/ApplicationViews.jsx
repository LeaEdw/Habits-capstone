import { useState, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

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
        <Route
          path="/"
          element={
            <>
              <NavigationBar />
              <Outlet />
            </>
          }
        />
          <Route>
            <Route path="/home" element={<HomePage/>} />
        </Route>
      </Routes>
    </>
  );
};
