import React, { useEffect, useState } from "react";
import Login from "../Authentication/Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Register from "../Authentication/Register/Register";
import Authentication from "../Authentication/Authentication";
import NotFound from "../NotFound/NotFound";

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  console.log(2)
  return (
    <Routes>
      <Route path="/" element={<Profile />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
