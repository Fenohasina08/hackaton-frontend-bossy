// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationLayout from "./layouts/NavigationLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import Home from "./pages/Home";
import Signin from "./pages/auth/login/Signin";
import Signup from "./pages/auth/signup/Signup";
import GoogleCallback from "./pages/auth/GooglaCallback";
import UniversitiesPage from "./pages/UniversitiesPage";
import Formation from "./pages/Formation";
import Orientation from "./pages/Orientation";
import About from "./pages/About";
import Setting from "./components/Setting";
import AdminStats from "./pages/admin/AdminStats";
import AdminUniversities from "./pages/admin/AdminUniversities ";
import AdminScholarships from "./pages/admin/AdminScholarships";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Routes avec layout principal */}
          <Route path="/" element={<NavigationLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="universities" element={<UniversitiesPage />} />
            <Route path="settings" element={<Setting />} />
            <Route path="orientation" element={<Orientation />} />
            <Route path="formation" element={<Formation />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* Routes d'authentification */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />

          {/* Routes Admin protégées */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/stats" replace />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="universities" element={<AdminUniversities />} />
            <Route path="scholarships" element={<AdminScholarships />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;