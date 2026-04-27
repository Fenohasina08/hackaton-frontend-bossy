import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import SignIn from "./pages/auth/login/Signin";
import SignUp from "./pages/auth/signup/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages d'Authentification (Hors du Layout) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<NavigationLayout />}>
          {/* Redirection de la racine vers /home */}
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          

        </Route>

        {/* Redirection pour les routes inconnues vers home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}