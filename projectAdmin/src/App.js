import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UserApproval from "./pages/UserApproval";
import NavBar from "./components/NavBar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let mount = true;
    const token = localStorage.getItem("token");
    if (token) {
      if (mount) {
        setIsLoggedIn(true);
      }
    } else {
      if (mount) {
        setIsLoggedIn(false);
      }
    }
    return () => {
      mount = false;
    };
  }, []);

  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn ? (
          <>
            <Route
              path="/home"
              element={ <><NavBar/><Home /></>}
            />
            <Route
              path="/approval-list"
              element={<><NavBar/><UserApproval /></>}
            />
            <Route
              path="/user" // Define dynamic route for property ID
              element={<><NavBar/><Users /></>}
            />
          </>
        ) : null}
      </Routes>
    </Router>
  );
};

export default App;
