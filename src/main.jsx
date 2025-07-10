import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router";
import AuthProvider from "./Firebase/AuthContext";
import { Toaster } from "react-hot-toast";
import Aos from "aos";
Aos.init({
  offset: 120, // Offset (in px) from the original trigger point
  delay: 400, // Delay in ms
  duration: 700, // Animation duration in ms
  easing: "ease", // Default easing for animations
  once: false, // ❗ Animation will trigger every time you scroll into view
  mirror: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster />
  </StrictMode>
);
