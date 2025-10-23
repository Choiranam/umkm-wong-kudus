import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";
import HomePage from "../pages/HomePage";
import KontakPage from "../pages/KontakPage";
import TentangKamiPage from "../pages/TentangKamiPage";
import PencarianPage from "../pages/PencarianPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Color Testing Route */}
                <Route path="/color" element={<TestColor />} />

                {/* Main Route */}
                <Route path="/" element={<KontakPage />} />

                {/* Tentang Kami Route */}
                <Route path="/tentang-kami" element={<TentangKamiPage />} />

                {/* Tentang Kami Route */}
                <Route path="/pencarian" element={<PencarianPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
