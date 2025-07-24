import { NavLink, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";

import { createContext } from "react";
import { fetchPostsByEmail, fetchUserByEmail } from "../../Hoocks/Api";
import Loading from "../../Component/Loading/Loading";
import { Helmet } from "react-helmet-async";

export const DashboardContext = createContext(null);

const DashBoard = () => {
  const { user } = useContext(AuthContext);

  const {
    data: posts,
    isLoading: postLoading,
    isError: postError,
    error: postErrObj,
    refetch: postRefetch,
  } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: () => fetchPostsByEmail(user?.email),
    enabled: !!user?.email,
  });

  const {
    data: userInfo,
    isLoading: userLoading,
    isError: userError,
    error: userErrObj,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserByEmail(user?.email),
    enabled: !!user?.email,
  });

  if (postLoading || userLoading) return <Loading />;
  if (postError || userError || postErrObj || userErrObj)
    return (
      <p className="text-red-500 text-center">Error loading dashboard data.</p>
    );

  return (
    <DashboardContext.Provider
      value={{ posts, userInfo, postLoading, postRefetch }}
    >
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="drawer lg:drawer-open">
        {/* ✅ Drawer Toggle Button (Hamburger) */}
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content flex flex-col">
          {/* ✅ Page content here */}
          <div className="w-full flex justify-between items-center px-4 py-2 bg-base-100 border-b lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <main className="p-4 w-full ">
            {/* <h1 className="md:text-4xl text-2xl md:font-bold font-semibold mb-5">
              Dashboard
            </h1> */}
            <Outlet />
          </main>
        </div>

        {/* ✅ Sidebar menu */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 pt-20 min-h-full bg-base-200 text-base-content">
            <li>
              <NavLink to="/dashboard" end>
                My Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-posts">My Posts</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-post">Add Post</NavLink>
            </li>
            {userInfo.role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/manage-user">Manage User</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reports">Reports</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/make-announcement">
                    Make Announcement
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashBoard;
