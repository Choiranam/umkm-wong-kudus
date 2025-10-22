import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Color Testing Route */}
                <Route path="/color" element={<TestColor />} />

                {/* Main Route */}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
