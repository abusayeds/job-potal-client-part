import React from "react";
import Container from "../Container";
import Image from "next/image";
import HeaderSearchForm from "./HeaderSearchForm";
import headerImage from "@/assets/images/header-image.jpg";
import WebsiteBranding from "../SubComponent/WebsiteBranding";

const Header = () => {
  return (
    <Container className="space-y-5 lg:space-y-6">
      <WebsiteBranding />
      <HeaderSearchForm />
      <div className="border-t-2 border-b-2 border-primary py-4 lg:py-6">
        <div className="max-h-[55vh] w-full overflow-hidden no-scrollbar scroll-smooth">
          <Image
            alt="header-image"
            src={headerImage}
            className="w-full h-full object-cover -mt-[17%]"
            width={2000}
            height={1000}
          />
        </div>
      </div>
    </Container>
  );
};

export default Header;
