import React, { useRef, useState, useEffect } from "react";
import SearchBar from "../ui/SearchBar";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api.js";

export default function Header({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const API_USER = "/user";

  const fetchUser = async () => {
    try {
      const res = await api.get(API_USER);
      if (res.data.status && res.data.data) setUser(res.data.data);
    } catch (err) {
      console.error("Gagal memuat user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  const getButtonClass = (tabName) =>
    activeTab === tabName
      ? "px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition"
      : "px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) fetchUser();
    else setLoading(false);
  }, []);

  useEffect(() => {
    const handleUserUpdated = () => fetchUser();
    window.addEventListener("userUpdated", handleUserUpdated);
    return () => window.removeEventListener("userUpdated", handleUserUpdated);
  }, []);

  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-9999 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Dashboard Admin</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              className={getButtonClass("Files")}
              onClick={() => setActiveTab("Files")}
            >
              Files
            </button>
            <button
              className={getButtonClass("Calendar")}
              onClick={() => setActiveTab("Calendar")}
            >
              Calendar
            </button>
            <button
              className={getButtonClass("Aktivities")}
              onClick={() => setActiveTab("Aktivities")}
            >
              Activities
            </button>
          </div>

          <SearchBar />

          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-orange-400/60 shadow-sm">
                <img
                  src={user?.foto_profil || "/images/default-avatar.webp"}
                  alt="User"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = "/images/default-avatar.webp")
                  }
                />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800 leading-none">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-gray-500">
                  {user?.email || ""}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    <User className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Info Profile</div>
                      <div className="text-xs text-gray-500">
                        Lihat dan edit profil
                      </div>
                    </div>
                  </button>

                  <hr className="mx-4 border-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
