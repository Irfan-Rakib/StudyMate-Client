import React from "react";
import { Link } from "react-router";
import Logo from "./../../assets/logo.png";
import Logo1 from "./../../assets/logo1.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-gray-700">
      <footer className="footer sm:footer-horizontal container mx-auto text-neutral-content  p-10">
        <aside>
          <Link to="/" className="flex gap-2  rounded- items-center">
            <img className="  w-10 md:w-14" src={Logo} alt="Logo" />
            <div className=" leading-tight">
              <h4 className="text-[#A88647] font-semibold text-lg">
                Study<span className="text-[#4A7BA8]">Mate</span>
              </h4>
              <p className="text-xs text-gray-300">
                Unlock Your Learning Potential
              </p>
            </div>
          </Link>
        </aside>
        <p className="md:mx-8">
          StudyMate is a MERN Stack web platform designed to help students
          connect and collaborate for better learning outcomes.It enables users
          to find study partners based on subjects, learning preferences, or
          nearby locations, making education more interactive, engaging, and
          goal-oriented.
        </p>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-current"
            >
              <FaXTwitter className="text-xl fill-current" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-current"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-current"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-gray-200 text-base-content p-4">
        <aside>
          <p>
            © {new Date().getFullYear()} — All rights reserved by{" "}
            <span className="text-[#A88647] font-semibold">Study</span>
            <span className="text-[#4A7BA8] font-semibold">Mate</span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
