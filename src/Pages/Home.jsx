import React from "react";
import HeroCarousel from "../Components/HeroCarousel";
import TopPartners from "../Components/TopPartners";
import HowItWorks from "../Components/HowItWorks";
import Testimonials from "../Components/Testimonials";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <HeroCarousel></HeroCarousel>
      <h2
        className="text-3xl font-bold text-center mt-20 mb-10 text-[#4A7BA8]"
        data-aos="fade-down"
      >
        Top Study Partners
      </h2>
      <TopPartners></TopPartners>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
