import React, { useState } from "react";

const Setting = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [pwd, setPwd] = useState({ current: "", new: "", confirm: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const handleSaveProfile = () => alert("Profile saved!");
  const handleUpdatePassword = () => {
    setErr("");
    setOk("");
    if (!pwd.current) return setErr("Current password required.");
    if (!pwd.new) return setErr("New password required.");
    if (pwd.new.length < 6) return setErr("Minimum 6 characters.");
    if (pwd.new !== pwd.confirm) return setErr("Passwords do not match.");
    setOk("Password updated!");
    setPwd({ current: "", new: "", confirm: "" });
    setTimeout(() => setOk(""), 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-[#2b2b2b] rounded-xl flex overflow-hidden shadow-xl pointer-events-auto">
          <div className="w-1/3 bg-[#242424] p-4 flex flex-col gap-2">
            {["profile", "password"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setErr(""); setOk(""); }}
                className={`p-2 rounded text-left transition-colors ${
                  tab === t ? "bg-[#3a3a3a] text-white" : "text-gray-400 hover:bg-[#2f2f2f]"
                }`}
              >
                {t === "profile" ? "Profile" : "Change Password"}
              </button>
            ))}
          </div>
          <div className="w-2/3 p-6 text-white overflow-y-auto relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl">✕</button>
            {tab === "profile" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-400 mb-2">Avatar</p>
                    <div className="w-20 h-20 rounded-full bg-gray-600" />
                    <input type="file" className="mt-3 text-sm text-gray-300 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#3a3a3a] file:text-white" />
                  </div>
                  {["username", "email"].map((field) => (
                    <div key={field}>
                      <p className="text-gray-400 capitalize">{field}</p>
                      <input
                        type={field === "email" ? "email" : "text"}
                        placeholder={`Enter ${field}`}
                        value={profile[field]}
                        onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                        className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  ))}
                  <button onClick={handleSaveProfile} className="w-full mt-4 py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600">Save Changes</button>
                </div>
              </div>
            )}
            {tab === "password" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <div className="space-y-5">
                  {[
                    { label: "Current Password", type: "password", key: "current", placeholder: "Enter current password" },
                    { label: "New Password", type: "password", key: "new", placeholder: "Enter new password", hint: "Minimum 6 characters" },
                    { label: "Confirm New Password", type: "password", key: "confirm", placeholder: "Re-enter new password" },
                  ].map(({ label, type, key, placeholder, hint }) => (
                    <div key={key}>
                      <p className="text-gray-400">{label}</p>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={pwd[key]}
                        onChange={(e) => setPwd({ ...pwd, [key]: e.target.value })}
                        className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white focus:ring-1 focus:ring-cyan-500"
                      />
                      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
                    </div>
                  ))}
                  {err && <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">{err}</div>}
                  {ok && <div className="text-green-400 text-sm bg-green-900/20 p-2 rounded">{ok}</div>}
                  <button onClick={handleUpdatePassword} className="w-full mt-2 py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600">Update Password</button>
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