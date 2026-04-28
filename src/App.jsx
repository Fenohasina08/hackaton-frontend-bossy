import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/auth/login/Signin";
import SignUp from "./pages/auth/signup/Signup";
import UniversitiesPage from "./pages/UniversitiesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/universities" element={<UniversitiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;