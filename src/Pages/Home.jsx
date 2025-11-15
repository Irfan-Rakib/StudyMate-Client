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
      <TopPartners></TopPartners>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
