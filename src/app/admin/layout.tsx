import React from "react";
import { TLayoutProps } from "@/types";
import Container from "@/components/Container";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import Header from "@/components/Admin/Header";

const MainLayout = ({ children }: TLayoutProps) => {
  return (
    <div className="relative flex max-w-[1920px] mx-auto">
      <AdminSidebar className="hidden lg:block sticky top-0 left-0 h-fit w-fit bg-gradient-to-b from-[#00448C] to-[#024F2E]" />
      <div className="flex-1">
        <Header />
        <Container className="" mClassName="py-0 lg:py-2 xl:py-3">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default MainLayout;
