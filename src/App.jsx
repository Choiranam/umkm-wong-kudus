import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import OfflineToast from "./components/toast/OfflineToast";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster
        toastOptions={{
          className: "font-poppins",
        }}
      />
      <OfflineToast />
      <AppRoutes />
    </div>
  );
}

export default App;
