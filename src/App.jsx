import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import Signin from "./pages/auth/login/Signin";
import Signup from "./pages/auth/signup/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection vers home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Layout principal */}
        <Route path="/" element={<NavigationLayout />}>
          <Route path="home" element={<Home />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}