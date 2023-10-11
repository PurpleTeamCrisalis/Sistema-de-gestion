import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

export const AppRouter = () => {
  const [status, setStatus] = useState("authenticated");

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
