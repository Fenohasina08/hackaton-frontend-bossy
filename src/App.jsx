import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import Signin from "./pages/auth/login/Signin";
import Signup from "./pages/auth/signup/Signup";
import UniversitiesPage from "./pages/UniversitiesPage";
import Setting from "./components/Setting";

import Temoignages from "./pages/Temoignages";

import { Orientation } from "./pages/Orientation"; // ← Ajout de l'import


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout principal */}
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Home />} />

          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="universities" element={<UniversitiesPage />} />
          <Route path="settings" element={<Setting />} />
          <Route path="orientation" element={<Orientation />} /> {/* ← Nouvelle route */}

        </Route>

        {/* Pages publiques */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        
       
        <Route path="/settings" element={<Setting />} />
        <Route path="/temoignages" element={<Temoignages />} />



        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;