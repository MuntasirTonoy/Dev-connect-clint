import { useContext } from "react";
import { NavLink } from "react-router";
import siteLogo from "../../assets/Images/logo.png";
import { AuthContext } from "../../Firebase/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import NotificationButton from "../Notification/NotificationButon";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut();
    // close menu after logout
  };

  return (
    <nav
      data-aos="fade-down"
      className="bg-base-200 shadow-xs mb-10 relative z-50 "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-5" src={siteLogo} alt="Logo" />
            <span className="ml-2 text-lg font-extrabold text-base-content">
              Dev Connect
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-base-content hover:text-base-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/membership"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-base-content hover:text-base-100"
            >
              Membership
            </NavLink>

            {user && <NotificationButton />}

            {!user && (
              <NavLink
                to="/join"
                className="btn px-4 py-2 rounded-full text-sm font-medium"
              >
                Join Us
              </NavLink>
            )}

            {/* Profile Dropdown (desktop) */}
            {user && (
              <div className="dropdown dropdown-end  ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt="Profile" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-10 p-2 font-semibold shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li className="mb-2">
                    <p className="text-sm font-semibold text-base-content">
                      {user.displayName}
                    </p>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2"
                    >
                      Logout <FiLogOut />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-3">
            <NotificationButton />
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm font-semibold dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52  z-10"
              >
                {user && (
                  <>
                    <li className="mb-2">
                      <p className="text-sm font-semibold text-base-content">
                        {user.displayName}
                      </p>
                    </li>
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/membership">Membership</NavLink>
                </li>
                {user ? (
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2"
                    >
                      Logout <FiLogOut />
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/join" className="flex items-center gap-2">
                      Join Us <LiaLongArrowAltRightSolid />
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
