import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/Home/HomePage";
import RootLayout from "../Root/RootLayout";
import Join from "../Pages/Authentication/Join/Join";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import MemberShip from "../Pages/MemberShip/MemberShip";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MyProfile from "../Component/MyProfile/MyProfile";
import AddPost from "../Component/AddPost/AddPost";
import MyPosts from "../Component/MyPost/MyPost";
import DashBoard from "../Pages/DashBoard/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/membership",
        element: <MemberShip />,
      },
      {
        path: "/post/id",
        element: <PostDetails />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
        children: [
          { index: true, element: <MyProfile /> },
          { path: "add-post", element: <AddPost /> },
          { path: "my-posts", element: <MyPosts /> },
        ],
      },
    ],
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
