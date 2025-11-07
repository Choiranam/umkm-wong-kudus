import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UKS2 from "/images/logo_navbar_footer.png";
import api from "../../../API/auth"; // Pastikan path ini benar

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // State untuk tiap grup
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openUMKM, setOpenUMKM] = useState(false);
  const [openArtikel, setOpenArtikel] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openKontak, setOpenKontak] = useState(false);
  const [openPengaturan, setOpenPengaturan] = useState(false);
  const [openAutentikasi, setOpenAutentikasi] = useState(false);

  // === LOGOUT FUNCTION ===
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      await api.post("/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.warn("Logout gagal di server, tetap lanjutkan logout lokal");
    } finally {
      // Bersihkan data login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      // Redirect ke halaman utama
      navigate("/", { replace: true });
    }
  };

  // Tutup sidebar saat klik di luar (mobile)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Tutup dengan ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Simpan expanded state
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // Auto-expand grup jika halaman aktif
  useEffect(() => {
    if (isActive(["/dashboard"])) setOpenDashboard(true);
    if (isActive(["/KategoriUMKM", "/UMKM", "/galeri-umkm"])) setOpenUMKM(true);
    if (isActive(["/kategori-admin", "/artikel-admin"])) setOpenArtikel(true);
    if (isActive(["/ratingadmin"])) setOpenRating(true);
    if (isActive(["/kontakadmin"])) setOpenKontak(true);
    if (isActive(["/settings", "/account", "/profile"])) setOpenPengaturan(true);
    if (isActive(["/register", "/forgot-password", "/registerexcel"])) setOpenAutentikasi(true);
  }, [pathname]);

  // Helper: toggle grup
  const toggle = (setter) => {
    setter((prev) => !prev);
    setSidebarExpanded(true);
  };

  // Helper: cek path aktif
  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((p) => pathname === p || pathname.startsWith(p + "/"));
    }
    return pathname === paths || pathname.startsWith(paths + "/");
  };

  return (
    <div className="min-w-fit">
      {/* Backdrop (mobile) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200"
            : "rounded-r-2xl shadow-xs"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-orange-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Tutup sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          <NavLink end to="/" className="block">
            <img src={UKS2} alt="Logo" className="w-10 h-auto" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* ==== Halaman ==== */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                ...
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Halaman
              </span>
            </h3>

            <ul className="mt-3">
              {/* Dashboard */}
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive(["/dashboard", "/"]) ? "bg-orange-50" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenDashboard);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        isActive(["/dashboard", "/"])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                      <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      Dashboard
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openDashboard ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openDashboard && "hidden"}`}>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/dashboard"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Halaman Awal
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* UMKM */}
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive(["/KategoriUMKM", "/UMKM", "/galeri-umkm"])
                      ? "bg-orange-50"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenUMKM);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 shrink-0 fill-current ${
                        isActive(["/KategoriUMKM", "/UMKM", "/galeri-umkm"])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 0-2 2v1H5a1 1 0 0 0 0 2h1v1a2 2 0 1 0 4 0V6h1a1 1 0 1 0 0-2h-1V3a2 2 0 0 0-2-2Zm0 2a1 1 0 0 1 1 1v1H7V4a1 1 0 0 1 1-1Z" />
                      <path d="M2 6h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm1 2v5h10V8H3Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      UMKM
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openUMKM ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openUMKM && "hidden"}`}>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/KategoriUMKM"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Kategori UMKM
                      </NavLink>
                    </li>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/UMKM"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        UMKM
                      </NavLink>
                    </li>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/galeri-umkm"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Galeri UMKM
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Artikel */}
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive([
                      "/kategori-admin",
                      "/artikel-admin",
                      "/artikel-admin/create",
                    ])
                      ? "bg-orange-50"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenArtikel);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 shrink-0 fill-current ${
                        isActive([
                          "/kategori-admin",
                          "/artikel-admin",
                          "/artikel-admin/create",
                        ])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2h12v12H2V2Zm10 2H4v8h8V4Z" />
                      <path d="M5 6h6v1H5V6Zm0 2h6v1H5V8Zm0 2h4v1H5v-1Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      Artikel
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openArtikel ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openArtikel && "hidden"}`}>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/kategori-admin"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Kategori
                      </NavLink>
                    </li>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/artikel-admin"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive ||
                            pathname === "/artikel-admin/create"
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Artikel
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Management Rating */}
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive(["/ratingadmin"]) ? "bg-orange-50" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenRating);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 shrink-0 fill-current ${
                        isActive(["/ratingadmin"])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0l2.4 4.9 5.4.8-3.9 3.8.9 5.4L8 12.2l-4.8 2.5.9-5.4L.2 5.7l5.4-.8L8 0Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      Management Rating
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openRating ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openRating && "hidden"}`}>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/ratingadmin"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Rating
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Kontak UMKM */}
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive(["/kontakadmin"]) ? "bg-orange-50" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenKontak);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 shrink-0 fill-current ${
                        isActive(["/kontakadmin"])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm0 2v6h12V5H2Zm2 1h8v1H4V6Zm0 2h5v1H4V8Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      Kontak UMKM
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openKontak ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openKontak && "hidden"}`}>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/kontakadmin"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Kontak UMKM
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Pengaturan */}
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive(["/settings", "/account", "/profile"])
                      ? "bg-orange-50"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenPengaturan);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 shrink-0 fill-current ${
                        isActive(["/settings", "/account", "/profile"])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 8 1Zm0 5a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 8 6Zm1.5 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      <path d="M13.5 8a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM15 8A7 7 0 1 0 1 8a7 7 0 0 0 14 0Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      Pengaturan
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openPengaturan ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openPengaturan && "hidden"}`}>
                    <li className="mb-1">
                      <NavLink
                        end
                        to="/profile"
                        className={({ isActive }) =>
                          `block text-sm transition truncate ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-500/90 hover:text-orange-600"
                          }`
                        }
                      >
                        Akun Saya
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* === Lainnya === */}
          <div className="mt-8">
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                ...
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Lainnya
              </span>
            </h3>

            <ul className="mt-3">
              <li className="mb-2">
                <a
                  href="#0"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    isActive([
                      "/register",
                      "/forgot-password",
                      "/registerexcel",
                    ])
                      ? "bg-orange-50"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(setOpenAutentikasi);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 shrink-0 fill-current ${
                        isActive([
                          "/register",
                          "/forgot-password",
                          "/registerexcel",
                        ])
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a4 4 0 0 0-4 4v1H3a1 1 0 0 0 0 2h1v1a4 4 0 0 0 8 0V7h1a1 1 0 1 0 0-2h-1V4a4 4 0 0 0-4-4ZM6 4a2 2 0 1 1 4 0v1H6V4Z" />
                      <path d="M10 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                    </svg>
                    <span className="ml-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-orange-600">
                      Autentikasi
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 shrink-0 ml-2 fill-current text-gray-400 ${
                      openAutentikasi ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </a>

                <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  <ul className={`pl-9 mt-1 ${!openAutentikasi && "hidden"}`}>
                    <li className="mb-1">
                      {/* KOSONGIN AJA */}
                    </li>
                    <li className="mb-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left text-sm transition truncate text-gray-500/90 hover:text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;