import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestColor from "../testing/TestColor";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TestColor />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
