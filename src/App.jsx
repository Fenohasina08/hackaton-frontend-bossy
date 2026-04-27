import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import SignIn from "./pages/auth/login/Signin";
import SignUp from "./pages/auth/signup/Signup";
import UniversitiesPage from "./pages/UniversitiesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/universities" element={<UniversitiesPage />} />

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