import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home/HomePage";
import RootLayout from "../Root/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
export default router;
