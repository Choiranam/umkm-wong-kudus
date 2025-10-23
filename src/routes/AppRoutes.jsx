import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";
import HomePage from "../pages/HomePage";
import KontakPage from "../pages/KontakPage";
import TentangKamiPage from "../pages/TentangKamiPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Color Testing Route */}
                <Route path="/color" element={<TestColor />} />

                {/* Main Route */}
                <Route path="/" element={<KontakPage />} />

                {/* Main Route */}
                <Route path="/tentang-kami" element={<TentangKamiPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
