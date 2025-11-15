import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

import {
  FaUserCircle,
  FaHome,
  FaSearch,
  FaPlusCircle,
  FaUsers,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import Logo from "../../assets/Logo.png";

const NavBar = () => {
  const handleTheme = (checked) => {
    const html = document.querySelector("html");
    if (checked) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
  };
  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    signOutFunc()
      .then(() => {
        toast.success("Logout successful!");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => toast.error(error.message));
  };

  // Profile page
  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const guestLinks = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/find-partners" className="flex items-center gap-2">
          <FaSearch /> Find Partners
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/find-partners" className="flex items-center gap-2">
          <FaSearch /> Find Partners
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/create-partner-profile"
          className="flex items-center gap-2"
        >
          <FaPlusCircle /> Create Partner Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-connections" className="flex items-center gap-2">
          <FaUsers /> My Connections
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 dark:bg-gray-800  shadow-xl sticky top-0 z-50">
      <div className="navbar container mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow"
            >
              {user ? userLinks : guestLinks}

              {!user && (
                <>
                  <li>
                    <NavLink to="/login" className="flex items-center gap-2">
                      <FaSignInAlt /> Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="flex items-center gap-2">
                      <FaUserPlus /> Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex gap-2 items-center">
            <img className="md:block w-10 md:w-14" src={Logo} alt="Logo" />
            <div className="hidden md:block leading-tight">
              <h4 className="text-[#A88647] font-semibold text-lg">
                Study<span className="text-[#4A7BA8]">Mate</span>
              </h4>
              <p className="text-xs text-gray-500">
                Unlock Your Learning Potential
              </p>
            </div>
          </Link>
        </div>

        {/* MIDDLE */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? userLinks : guestLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-3" ref={dropdownRef}>
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>

            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              value="synthwave"
              className="toggle "
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>

          {/* User Auth Section */}
          {loading ? (
            <HashLoader size={30} color="#F59E0B" />
          ) : user ? (
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400"
              >
                {user?.photoURL ? (
                  <img
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-500" />
                )}
              </div>

              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 border rounded-lg shadow-lg animate-fade-in">
                  <button
                    onClick={handleProfile}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaUser /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="flex   gap-3">
                <Link
                  to="/login"
                  className="btn bg-[#A88647] text-white font-bold flex items-center gap-2"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/register"
                  className="btn bg-[#4A7BA8] text-white font-bold flex items-center gap-2"
                >
                  <FaUserPlus /> Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
