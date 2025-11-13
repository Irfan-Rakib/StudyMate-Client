import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // react-router-dom
import { router } from "./Routes/Router.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider.jsx";
import { HashLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
AOS.init({
  once: true, // animate only once
  duration: 1000, // animation duration
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="flex justify-center items-center h-screen">
            <HashLoader />
          </div>
        }
      />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
