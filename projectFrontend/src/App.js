import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Property from "./pages/Property";
import Profile from "./pages/Profile";

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
        <Route path="/register" element={<Register />} />
        {isLoggedIn ? (
          <>
            <Route
              path="/home"
              element={
                <>
                  <Header />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/property"
              element={
                <>
                  <Header />
                  <Property />
                  <Footer />
                </>
              }
            />
            <Route
              path="/property/:id" // Define dynamic route for property ID
              element={
                <>
                  <Header />
                  <Property />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header />
                  <Profile />
                  <Footer />
                </>
              }
            />
          </>
        ) : null}
      </Routes>
    </Router>
  );
};

export default App;
