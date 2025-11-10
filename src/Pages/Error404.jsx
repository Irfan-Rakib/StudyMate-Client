import React from "react";
import ErrImg from "../assets/error-404.png";
const Error404 = () => {
  return (
    <div className="container mx-auto px-8">
      <div className="container mx-auto flex flex-col justify-center items-center gap-5 h-screen w-screen px-5 mr-0">
        <img className="mb-10" src={ErrImg} alt="" />
        <h1 className="font-bold text-4xl">Oops, page not found!</h1>
        <p className="font-semibold">
          The page you are looking for is not available.
        </p>
        <a
          className="btn  bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white p-5"
          href="/"
        >
          Goo Back
        </a>
      </div>
    </div>
  );
};

export default Error404;
