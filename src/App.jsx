import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import NetworkToast from "./components/NetworkToast";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        containerClassName="
    !top-4
    md:!top-auto md:!bottom-4 md:!left-4 md:!right-auto
  "
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
