import { NavLink, Outlet } from "react-router";

const DashBoard = () => {
  return (
    <section className="max-w-7xl  mx-auto px-4 z-0 py-12 ">
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
  );
};

export default DashBoard;
