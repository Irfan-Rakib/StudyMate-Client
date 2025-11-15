import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" flex items-center mx-auto my-8">
      {/* Text Content */}
      <div className="flex-1 text-center ">
        <h1 className="md:text-4xl text-3xl  font-bold text-[#4A7BA8] dark:text-[#00BFFF] mb-4">
          Find Your Perfect{" "}
          <span className="text-[#A88647]">Study Partner</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-md ">
          Connect with students, collaborate, and unlock your full learning
          potential. StudyMate makes finding study partners easier and more
          effective.
        </p>
      </div>
    </section>
  );
};

export default Hero;
