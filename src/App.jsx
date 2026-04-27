// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<NavigationLayout />}>
          <Route path="home" element={<Home />} />
          {/* ... autres routes */}
        </Route>
      </Routes>
    </Router>
  );
}