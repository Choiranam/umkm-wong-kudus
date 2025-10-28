import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "/images/logo_navbar_footer.png";
import useLogin from "../../API/UseLogin";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const { login, loading, error } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password, remember);

    if (success) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    }
  };

  return (
    <div className="bg-light min-h-screen h-screen overflow-hidden relative">
      {showPopup && (
        <div className="absolute top-5 right-5 bg-green text-white px-4 py-2 rounded-md shadow-md text-sm animate-fade-in">
          ✅ Login berhasil!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="flex flex-col justify-center items-center px-6 md:px-12 lg:px-16">
          <img src={logo} alt="Logo Kudus" className="w-28 mb-3" />

          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-dark/50 mb-6 text-center text-sm">
            Enter your email and password to access admin page
          </p>

          <form onSubmit={onSubmit} className="w-full max-w-sm">
            {/* Email */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-dark/40 rounded-md py-2 px-3 focus:outline-none text-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-dark/40 rounded-md py-2 px-3 focus:outline-none pr-10 text-sm"
                  required
                />
                <Icon
                  icon={showPassword ?  "mdi:eye": "mdi:eye-off"}
                  className="absolute right-3 top-2.5 cursor-pointer text-dark/50"
                  width="18"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm text-dark/50">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-orange cursor-pointer"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <span>Remember me</span>
              </label>


            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange py-2.5 rounded-md text-white font-semibold text-sm transition-all cursor-pointer ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-orange"
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            {error && (
              <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
            )}
          </form>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <img
            src="https://www.daaruttauhiid.org/wp-content/uploads/2020/05/Melancong-Asik-ke-Masjid-Menara-Kudus_Daarut-Tauhiid.jpg"
            className="w-full h-full object-cover"
            alt="Masjid Menara Kudus"
          />
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
