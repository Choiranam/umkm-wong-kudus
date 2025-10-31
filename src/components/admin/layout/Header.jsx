import React, { useRef } from "react";
import SearchBar from "../ui/SearchBar";
import { Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../API/authService";

export default function Header({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const dropdownRef = useRef(null);
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const getButtonClass = (tabName) => {
    return activeTab === tabName
      ? "px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition"
      : "px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition";
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Dashboard Admin</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className={getButtonClass("Files")} onClick={() => setActiveTab("Files")}>
              Files
            </button>
            <button className={getButtonClass("Calendar")} onClick={() => setActiveTab("Calendar")}>
              Calendar
            </button>
            <button className={getButtonClass("Aktivitas")} onClick={() => setActiveTab("Aktivitas")}>
              Aktivitas
            </button>
          </div>

          <SearchBar />
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={user?.foto_profil || "/images/default-avatar.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.png";
                  }}
                />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpenDropdown(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left text-sm"
                >
                  <User className="w-4 h-4" />
                  Info Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/edit-profile");
                    setOpenDropdown(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <div className="border-t my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}