import React from "react";
import { Link, NavLink } from "react-router";
import Logo1 from "./../../assets/Logo1.png";
import Logo from "./../../assets/Logo.png";
const NavBar = () => {
  const Links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/find-partners">Find Partners</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <Link
            to="/"
            className="btn flex gap-0 justify-center items-center py-7 px-3 text-xl"
          >
            <img
              className="w-25 text-center block md:hidden"
              src={Logo1}
              alt="Logo1"
            />
            <img
              className="w-35 pt-5 text-center hidden md:block"
              src={Logo}
              alt="Logo"
            />
            <div className="hidden md:block">
              <h4 className="text-[#A88647] text-balance">
                Study<span className="text-[#4A7BA8]">Mate</span>
              </h4>
              <p className="text-sm text-gray-500">
                Unlock Your Learning Potential
              </p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
