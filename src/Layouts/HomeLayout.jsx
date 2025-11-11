import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mx-auto px-3  py-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
