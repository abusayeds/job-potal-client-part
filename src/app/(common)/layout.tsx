import React from "react";
import { TLayoutProps } from "@/types";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

const MainLayout = ({ children }: TLayoutProps) => {
  return (
    <div className="relative">
      <Navbar />
      {children}
      <Footer />
      {/* <ScrollTracker/> */}
    </div>
  );
};

export default MainLayout;
