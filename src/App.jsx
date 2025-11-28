import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import NetworkToast from "./components/NetworkToast";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Cursor from "./components/Cursor.jsx";
function App() {
  useEffect(() => {
    document.documentElement.classList.add("waiting");

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.documentElement.classList.remove("waiting");

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div>
      <Cursor />
      <Toaster
        position="top-center"
        containerClassName="!top-4 md:!top-auto md:!bottom-4 md:!left-4 md:!right-auto"
        toastOptions={{
          className: "font-poppins",
        }}
      />
      <NetworkToast />
      <AppRoutes />
    </div>
  );
}

export default App;
