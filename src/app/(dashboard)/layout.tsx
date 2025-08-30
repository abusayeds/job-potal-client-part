import React from "react";
import { TLayoutProps } from "@/types";
import Sidebar from "@/components/Dashboard/Sidebar";
import Container from "@/components/Container";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import PhoneOpitions from "@/components/Dashboard/PhoneOpitions";

const MainLayout = ({ children }: TLayoutProps) => {
 
  return (
    <div className="relative">
      <Navbar from="dashboard" />
      <Container mClassName="py-0 lg:py-0 xl:py-0 flex ">
        <Sidebar className="hidden lg:block h-full min-h-full w-56 xl:w-64" />
        <div className="flex-1 lg:pl-4 xl:pl-6 lg:border-l-2 border-gray-100 py-4 lg:py-6 max-w-full">
          {children}
        </div>
        <PhoneOpitions />
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
