import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Gulir ke atas setiap kali path berubah
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // bisa diganti "auto" kalau mau langsung tanpa animasi
        });
    }, [pathname]);

    return null; // Komponen ini tidak merender apa pun
};

export default ScrollToTop;
