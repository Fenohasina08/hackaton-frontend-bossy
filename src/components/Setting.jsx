import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleSaveProfile = () => {
    alert("Profile changes saved successfully!");
  };

  const handleUpdatePassword = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordSuccess("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(""), 3000);
  };

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={closeModal} />
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-[#2b2b2b] rounded-xl flex overflow-hidden shadow-xl pointer-events-auto">
          <div className="w-1/3 bg-[#242424] p-4 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab("profile");
                setPasswordError("");
                setPasswordSuccess("");
              }}
              className={`p-2 rounded text-left transition-colors ${
                activeTab === "profile"
                  ? "bg-[#3a3a3a] text-white"
                  : "text-gray-400 hover:bg-[#2f2f2f] hover:text-gray-200"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => {
                setActiveTab("password");
                setPasswordError("");
                setPasswordSuccess("");
              }}
              className={`p-2 rounded text-left transition-colors ${
                activeTab === "password"
                  ? "bg-[#3a3a3a] text-white"
                  : "text-gray-400 hover:bg-[#2f2f2f] hover:text-gray-200"
              }`}
            >
              Change Password
            </button>
          </div>
          <div className="w-2/3 p-6 text-white overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-400 mb-2">Avatar</p>
                    <div className="w-20 h-20 rounded-full bg-gray-600"></div>
                    <input
                      type="file"
                      className="mt-3 text-sm text-gray-300 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-[#3a3a3a] file:text-white hover:file:bg-[#4a4a4a]"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400">Username</p>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="w-full mt-4 py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            {activeTab === "password" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-400">Current Password</p>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400">New Password</p>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 6 characters
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Confirm New Password</p>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  {passwordError && (
                    <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">
                      {passwordError}
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="text-green-400 text-sm bg-green-900/20 p-2 rounded">
                      {passwordSuccess}
                    </div>
                  )}
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full mt-2 py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600 transition-colors"
                  >
                    Update Password
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