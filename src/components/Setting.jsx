import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, User, Mail, Lock, Camera, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Setting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setProfileError("");
    setProfileSuccess("");

    if (!username.trim()) {
      setProfileError("Le nom d'utilisateur est requis.");
      return;
    }
    if (!email.trim()) {
      setProfileError("L'email est requis.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError("Veuillez entrer un email valide.");
      return;
    }

    setProfileLoading(true);
    setTimeout(() => {
      setProfileSuccess("Profil mis à jour avec succès !");
      setProfileLoading(false);
    }, 800);
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword) {
      setPasswordError("Veuillez saisir votre mot de passe actuel.");
      return;
    }
    if (!newPassword) {
      setPasswordError("Veuillez saisir un nouveau mot de passe.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordSuccess("Mot de passe modifié avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[700px] max-w-[95vw] h-[500px] max-h-[90vh] bg-[#2b2b2b] rounded-xl flex overflow-hidden relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="w-1/3 bg-[#242424] p-4 flex flex-col gap-2 border-r border-gray-700">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 p-2 rounded text-left transition-colors ${
              activeTab === "profile" ? "bg-[#3a3a3a] text-white" : "text-gray-400 hover:bg-[#2e2e2e] hover:text-white"
            }`}
          >
            <User size={16} />
            Profil
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 p-2 rounded text-left transition-colors ${
              activeTab === "password" ? "bg-[#3a3a3a] text-white" : "text-gray-400 hover:bg-[#2e2e2e] hover:text-white"
            }`}
          >
            <Lock size={16} />
            Mot de passe
          </button>
        </div>

        <div className="w-2/3 p-6 text-white overflow-y-auto">
          {activeTab === "profile" && (
            <>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User size={20} /> Paramètres du profil
              </h2>

              {profileError && (
                <div className="bg-red-500/20 border border-red-400/30 p-3 rounded text-red-300 text-sm mb-4 flex items-center gap-2">
                  <AlertCircle size={16} /> {profileError}
                </div>
              )}
              {profileSuccess && (
                <div className="bg-green-500/20 border border-green-400/30 p-3 rounded text-green-300 text-sm mb-4 flex items-center gap-2">
                  <CheckCircle size={16} /> {profileSuccess}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <p className="text-gray-400 mb-3">Avatar</p>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={24} className="text-gray-400" />
                      )}
                    </div>
                    <label className="cursor-pointer bg-[#3a3a3a] hover:bg-[#4a4a4a] transition-colors px-4 py-2 rounded text-sm">
                      Choisir une photo
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 flex items-center gap-1">
                    <User size={14} /> Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="text-gray-400 flex items-center gap-1">
                    <Mail size={14} /> Email
                  </label>
                  <input
                    type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={profileLoading}
                  className="w-full py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {profileLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </button>
              </div>
            </>
          )}

          {activeTab === "password" && (
            <>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock size={20} /> Changer le mot de passe
              </h2>

              {passwordError && (
                <div className="bg-red-500/20 border border-red-400/30 p-3 rounded text-red-300 text-sm mb-4 flex items-center gap-2">
                  <AlertCircle size={16} /> {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="bg-green-500/20 border border-green-400/30 p-3 rounded text-green-300 text-sm mb-4 flex items-center gap-2">
                  <CheckCircle size={16} /> {passwordSuccess}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="text-gray-400 flex items-center gap-1">
                    <Lock size={14} /> Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    placeholder="Entrez votre mot de passe actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="text-gray-400">Nouveau mot de passe</label>
                  <input
                    type="password"
                    placeholder="Entrez le nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="text-gray-400">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    placeholder="Confirmez le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-2 p-2 rounded bg-[#3a3a3a] outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="w-full py-2 bg-cyan-500 rounded text-white font-bold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Mise à jour...
                    </>
                  ) : (
                    "Mettre à jour le mot de passe"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;