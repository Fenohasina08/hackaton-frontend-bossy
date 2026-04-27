import React, { useState } from "react";

const Setting = ({ isOpen, onClose }) => {
  // Which tab is open: "profile" or "password"
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Password form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Messages for errors and success
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Save profile handler
  const handleSaveProfile = () => {
    alert("Profile saved!");
  };

  // Update password handler
  const handleUpdatePassword = () => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (currentPassword === "") {
      setErrorMessage("Current password required.");
      return;
    }
    if (newPassword === "") {
      setErrorMessage("New password required.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage("Minimum 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Success
    setSuccessMessage("Password updated!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Don't render anything if the modal is closed
  if (!isOpen) return null;

  return (
    <>
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-[#2b2b2b] rounded-xl flex overflow-hidden shadow-xl pointer-events-auto">
          
          {/* LEFT SIDEBAR */}
          <div className="w-1/3 bg-[#242424] p-4 flex flex-col gap-2">
            {/* Profile Tab Button */}
            <button
              onClick={() => {
                setActiveTab("profile");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`p-2 rounded text-left transition-colors ${
                activeTab === "profile"
                  ? "bg-[#3a3a3a] text-white"
                  : "text-gray-400 hover:bg-[#2f2f2f]"
              }`}
            >
              Profile
            </button>

            {/* Change Password Tab Button */}
            <button
              onClick={() => {
                setActiveTab("password");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className={`p-2 rounded text-left transition-colors ${
                activeTab === "password"
                  ? "bg-[#3a3a3a] text-white"
                  : "text-gray-400 hover:bg-[#2f2f2f]"
              }`}
            >
              Change Password
            </button>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="w-2/3 p-6 text-white overflow-y-auto relative">
            {/* Close button (X) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            {/* PROFILE TAB CONTENT */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                <div className="space-y-5">
                  {/* Avatar section */}
                  <div>
                    <p className="text-gray-400 mb-2">Avatar</p>
                    <div className="w-20 h-20 rounded-full bg-gray-600" />
                    <input
                      type="file"
                      className="mt-3 text-sm text-gray-300 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#3a3a3a] file:text-white"
                    />
                  </div>

                  {/* Username field */}
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

                  {/* Email field */}
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

                  {/* Save button */}
                  <button
                    onClick={handleSaveProfile}
                    className="w-full mt-4 py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* CHANGE PASSWORD TAB CONTENT */}
            {activeTab === "password" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <div className="space-y-5">
                  {/* Current password */}
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

                  {/* New password */}
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

                  {/* Confirm new password */}
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

                  {/* Error / success messages */}
                  {errorMessage && (
                    <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="text-green-400 text-sm bg-green-900/20 p-2 rounded">
                      {successMessage}
                    </div>
                  )}

                  {/* Update password button */}
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full mt-2 py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600"
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