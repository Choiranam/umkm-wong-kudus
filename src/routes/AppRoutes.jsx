import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";
import HomePage from "../pages/HomePage";
import KontakPage from "../pages/KontakPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Color Testing Route */}
                <Route path="/color" element={<TestColor />} />

                {/* Main Route */}
                <Route path="/" element={<KontakPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
