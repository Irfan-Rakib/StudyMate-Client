import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../../assets/Logo.png";

const NavBar = () => {
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

  // Profile navigation
  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation links
  const guestLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/find-partners">Find Partners</NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/find-partners">Find Partners</NavLink>
      </li>
      <li>
        <NavLink to="/create-partner-profile">Create Partner Profile</NavLink>
      </li>
      <li>
        <NavLink to="/my-connections">My Connections</NavLink>
      </li>
    </>
  );
  console.log(user);
  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
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
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex gap-2 items-center">
            <img className=" md:block w-10 md:w-14" src={Logo} alt="Logo" />
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

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? userLinks : guestLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end" ref={dropdownRef}>
          {loading ? (
            <HashLoader size={30} color="#F59E0B" />
          ) : user ? (
            <div className="relative">
              {/* Profile photo */}
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-500" />
                )}
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-lg animate-fade-in">
                  <button
                    onClick={handleProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="btn  bg-[#A88647]  text-white font-bold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-[#4A7BA8] text-white font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
