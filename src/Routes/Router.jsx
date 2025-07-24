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
import PrivateRoute from "../Private/PrivateRoute";
import Notifications from "../Component/Notification/Notifications";
import CommentPage from "../Pages/CommentPage.jsx/CommentPage";
import ManageUser from "../Component/ManageUser/ManageUser";
import Reports from "../Component/Reports/Reports";
import MakeAnnouncement from "../Component/MakeAnnouncement/MakeAnnouncement";
import Error from "../Pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <MemberShip />
          </PrivateRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),

        children: [
          { index: true, element: <MyProfile /> },
          { path: "add-post", element: <AddPost /> },
          { path: "my-posts", element: <MyPosts /> },
          {
            path: "manage-user",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <ManageUser />
              </PrivateRoute>
            ),
          },
          {
            path: "reports",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <Reports />
              </PrivateRoute>
            ),
          },
          {
            path: "make-announcement",
            element: (
              <PrivateRoute allowedRoles={["admin"]}>
                <MakeAnnouncement />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/comments/:postId",
        element: (
          <PrivateRoute>
            <CommentPage />
          </PrivateRoute>
        ),
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
