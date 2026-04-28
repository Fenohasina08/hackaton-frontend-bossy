// src/pages/auth/signup/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await register({ username, email, password });
    if (result.success) {
      navigate("/home");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/30 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-500/25 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-300/20 rounded-full"></div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center gap-6 p-12">
        <h2 className="text-4xl font-bold text-cyan-300 mb-6">Join UniGuide Today!</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-indigo-700/40 p-6 rounded-2xl w-28 h-28"></div>
          <div className="bg-indigo-600/40 p-6 rounded-2xl w-28 h-28"></div>
          <div className="bg-indigo-500/40 p-6 rounded-2xl w-28 h-28"></div>
          <div className="bg-indigo-400/40 p-6 rounded-2xl w-28 h-28"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-indigo-900/30 p-8 rounded-3xl backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">UniGuide</h1>
            <p className="text-white text-sm">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 rounded-xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-white text-center mt-3">
              Already have an account?{" "}
              <Link to="/signin" className="text-cyan-300 cursor-pointer hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;