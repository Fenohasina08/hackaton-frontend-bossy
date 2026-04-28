import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";
import Signin from "./pages/auth/login/Signin";
import Signup from "./pages/auth/signup/Signup";
import UniversitiesPage from "./pages/UniversitiesPage";
import Formation from "../src/pages/Formation";
import Orientation from "../src/pages/Orientation";
import About from "../src/pages/About";
import Setting from "./components/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout principal */}
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Home />} />

          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/orientation" element={<Orientation />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/about" element={<About />} />

        </Route>

        {/* Pages publiques */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />


        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;