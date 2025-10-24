import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";
import HomePage from "../pages/HomePage";
import KontakPage from "../pages/KontakPage";
import TentangKamiPage from "../pages/TentangKamiPage";
import PencarianPage from "../pages/PencarianPage";
import ScrollToTop from "../components/ScrollTop"; 

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
            </Routes>
        </Router>
    );
};

export default AppRoutes;
