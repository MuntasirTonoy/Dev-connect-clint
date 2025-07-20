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
  if (postError || userError)
    return <p className="text-red-500">Error loading dashboard data.</p>;

  return (
    <DashboardContext.Provider
      value={{ posts, userInfo, postLoading, postRefetch }}
    >
      <section className="max-w-7xl  mx-auto px-4 z-0 py-12 ">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {/* Top Tabs Navigation */}
        <nav className="flex space-x-1  md:space-x-4 bg-base-100 border-b-2 text-sm p-4 mb-6">
          <NavLink
            to="/dashboard"
            end
            className="dashB px-4 py-2 rounded hover:bg-base-300"
          >
            My Profile
          </NavLink>
          <NavLink
            to="/dashboard/add-post"
            className="dashB px-4 py-2 rounded hover:bg-base-300"
          >
            Add Post
          </NavLink>
          <NavLink
            to="/dashboard/my-posts"
            className="dashB px-4 py-2 rounded hover:bg-base-300"
          >
            My Posts
          </NavLink>
        </nav>

        {/* Main Content */}
        <main>
          <Outlet />
        </main>
      </section>
    </DashboardContext.Provider>
  );
};

export default DashBoard;
