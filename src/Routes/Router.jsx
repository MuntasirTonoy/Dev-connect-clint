import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home/HomePage";
import RootLayout from "../Root/RootLayout";
import Join from "../Pages/Authentication/Join/Join";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
export default router;
