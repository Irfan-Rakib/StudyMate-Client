import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
