import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "../components/AppLayout";

import HomePage from "../pages/HomePage";
import KontakPage from "../pages/KontakPage";
import TentangKamiPage from "../pages/TentangKamiPage";
import PencarianPage from "../pages/PencarianPage";
import KecamatanPage from "../pages/KecamatanPage";
import KategoriPage from "./../pages/KategoriPage";
import TentangUMKMPage from "../pages/TentangUMKMPage";
import DetailUMKMPage from "../pages/DetailUMKMPage";
import ArtikelPage from "../pages/ArtikelPage";
import LoginPage from "../pages/admin/LoginPage";
import DetailArtikelPage from "../pages/DetailArtikelPage";
import DashboardPage from "../pages/admin/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import UserRoute from "./UserRoute.jsx";
import UMKMPage from "../pages/admin/UMKMPage.jsx";
import KategoriAdminPage from "../pages/admin/KategoriPage.jsx";
import ArtikelAdmin from "../pages/admin/ArtikelPage.jsx";
import CreateArtikelPage from "../pages/admin/CreateArtikelPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/kontak", element: <KontakPage /> },
      { path: "/tentang-kami", element: <TentangKamiPage /> },
      { path: "/pencarian", element: <PencarianPage /> },
      { path: "/kecamatan/:slug", element: <KecamatanPage /> },
      { path: "/kategori", element: <KategoriPage /> },
      { path: "/tentang-umkm", element: <TentangUMKMPage /> },
      { path: "/detail-umkm/:slug", element: <DetailUMKMPage /> },
      { path: "/artikel", element: <ArtikelPage /> },
      { path: "/artikel/:category/:slug", element: <DetailArtikelPage /> },
      { path: "/login", element: <LoginPage /> },
      {path: "/dashboard",element: (<UserRoute><DashboardPage /></UserRoute>),},
      {path: "/kategori-admin",element: (<UserRoute><KategoriAdminPage /></UserRoute>),},
      {path: "/artikel-admin",element: (<UserRoute><ArtikelAdmin /></UserRoute>),},
      { path: "/artikel-admin/create", element: <CreateArtikelPage /> },
      {path: "/UMKM",element: (<UserRoute><UMKMPage /></UserRoute>),},
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
