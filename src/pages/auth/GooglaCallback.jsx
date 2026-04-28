import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    if (token) {
      localStorage.setItem("token", token);
      if (userData) {
        try {
          const user = JSON.parse(decodeURIComponent(userData));
          updateUser(user);
        } catch (e) {}
      }
      navigate("/home");
    } else {
      navigate("/signin");
    }
  }, [searchParams, navigate, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="text-white mt-4">Connexion en cours...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;