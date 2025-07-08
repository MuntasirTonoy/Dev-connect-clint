import React from "react";
import HomePage from "../Pages/Home/HomePage";
import Navbar from "../Component/NavBar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Component/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
