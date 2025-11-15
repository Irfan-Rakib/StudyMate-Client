import React from "react";
import NotFoundImg from "../assets/App-Error.png";
const NotFound = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center gap-5 h-screen w-screen px-8">
      <img className="mb-10" src={NotFoundImg} alt="" />
      {/* <h1 className="font-bold text-4xl">Oops, Connection not found!</h1> */}
      <p className="font-semibold">
        Connections you are looking for is not available.
      </p>
      <a
        className="btn   bg-[#4A7BA8] hover:bg-[#A88647] text-white p-5"
        href="/"
      >
        Goo Back
      </a>
    </div>
  );
};

export default NotFound;
