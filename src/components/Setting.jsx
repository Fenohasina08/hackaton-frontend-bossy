// src/components/Setting.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/auth";
import toast from "react-hot-toast";
import { User, Mail, Lock, Save, X, Camera } from 'lucide-react';

const Setting = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, updateUser, logout } = useAuth();

  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
      setEmail(user.email || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await api.put("/auth/profile", { username });
      if (response.data.success) {
        updateUser({ ...user, name: username });
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      if (response.data.success) {
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (username) return username.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex overflow-hidden shadow-2xl pointer-events-auto border border-gray-700">
          
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-900/50 p-4 flex flex-col gap-2 border-r border-gray-700">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === "password"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Lock size={20} />
              <span>Security</span>
            </button>
          </div>

          {/* Content */}
          <div className="w-2/3 p-6 text-white overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Profile Settings
                </h2>
                
                <div className="space-y-6">
                  {/* Avatar section */}
                  <div className="flex flex-col items-center">
                    <div className="relative group cursor-pointer">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-500/50"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white ring-4 ring-cyan-500/50">
                          {getInitials()}
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                        <Camera size={24} className="text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Click to change avatar</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "password" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Security Settings
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <button
                    onClick={handleUpdatePassword}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;