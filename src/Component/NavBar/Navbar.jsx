import { useState } from "react";
import { NavLink } from "react-router";
import siteLogo from "../../assets/Images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close profile dropdown when menu is toggled
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    // Close mobile menu when profile is toggled
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Site Name - Left Side */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-10 w-8" src={siteLogo} alt="Logo" />
            </div>
            <span className="ml-2 text-3xl font-bold text-gray-800">
              Dev Connect
            </span>
          </div>

          {/* Desktop Navigation - Right Side (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className=" px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white "
            >
              Home
            </NavLink>
            <NavLink
              to="/"
              className=" px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white "
            >
              Membership
            </NavLink>
            <button className="p-2 text-gray-700 hover:text-gray-900">
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
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <NavLink
              to="/join"
              className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Join Us
            </NavLink>

            {/* Profile dropdown */}
            <div className="relative ml-4">
              <button
                onClick={toggleProfile}
                className="flex items-center focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="Profile"
                />
              </button>

              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-gray-700">John Doe</p>
                  </div>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-sm  bg-gray-100 text-gray-900"
                  >
                    Dashboard
                  </NavLink>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 "
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
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
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden on desktop) */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1  sm:px-3 ">
          <NavLink
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white "
          >
            Home
          </NavLink>
          <NavLink
            to="/membership"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white "
          >
            Membership
          </NavLink>
          <NavLink
            to="/notification"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white "
          >
            Notification
          </NavLink>
          {/* Profile section in mobile menu */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="text-base font-medium text-gray-800">
                John Doe
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <NavLink
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white "
              >
                Dashboard
              </NavLink>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
