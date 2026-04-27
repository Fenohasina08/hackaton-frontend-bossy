import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import Signin from "./pages/auth/login/Signin";
import Signup from "./pages/auth/signup/Signup";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Layout principal */}
        <Route path="/" element={<NavigationLayout />}>
          {/* Home devient la page par défaut */}
          <Route index element={<Home />} />
        </Route>

        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}