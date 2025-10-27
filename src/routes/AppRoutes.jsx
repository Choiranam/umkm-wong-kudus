import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";
import HomePage from "../pages/HomePage";
import KontakPage from "../pages/KontakPage";
import TentangKamiPage from "../pages/TentangKamiPage";
import PencarianPage from "../pages/PencarianPage";
import ScrollToTop from "../components/ScrollTop";
import KecamatanPage from "../pages/KecamatanPage";
import KategoriPage from "./../pages/KategoriPage";
import TentangUMKMPage from "../pages/TentangUMKMPage";
import ArtikelPage from "../pages/ArtikelPage";
import DetailUMKMPage from "../pages/DetailUMKMPage";
import LoginPage from "../pages/admin/LoginPage";
import DetailArtikelPage from "../pages/DetailArtikelPage";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Color Testing Route */}
        <Route path="/color" element={<TestColor />} />

        {/* Main Route */}
        <Route path="/" element={<HomePage />} />

        {/* Kontak Route */}
        <Route path="/kontak" element={<KontakPage />} />

        {/* Tentang Kami Route */}
        <Route path="/tentang-kami" element={<TentangKamiPage />} />

        {/* Pencarian Route */}
        <Route path="/pencarian" element={<PencarianPage />} />

        {/* Kecamatan Route */}
        <Route path="/kecamatan/:slug" element={<KecamatanPage />} />

        {/* Kategori Route */}
        <Route path="/kategori" element={<KategoriPage />} />

        {/* Tentang UMKM Route */}
        <Route path="/tentang-umkm" element={<TentangUMKMPage />} />

        {/* Detail UMKM Route */}
        <Route path="/detailumkm" element={<DetailUMKMPage />} />

        {/* Artikel Route */}
        <Route path="/artikel" element={<ArtikelPage />} />

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Detail Artikel Route */}
        <Route path="/artikel/:category/:slug" element={<DetailArtikelPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
