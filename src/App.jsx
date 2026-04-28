import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import Signin from "./pages/auth/login/Signin";
import Signup from "./pages/auth/signup/Signup";
import UniversitiesPage from "./pages/UniversitiesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout principal */}
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Pages publiques */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<NavigationLayout/>}>
          <Route path="/universities" element={<UniversitiesPage />} />
        </Route>
        

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;