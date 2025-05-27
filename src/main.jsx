import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainState from "./Context/MainState.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <MainState>
    <AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        closeButton
      />
      <App />
    </AuthProvider>
  </MainState>
);
