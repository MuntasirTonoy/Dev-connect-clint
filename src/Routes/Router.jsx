import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home/HomePage";
import RootLayout from "../Root/RootLayout";
import Join from "../Pages/Authentication/Join/Join";

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
]);
export default router;
