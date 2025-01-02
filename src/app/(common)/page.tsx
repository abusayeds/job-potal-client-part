import React from "react";
import Header from "@/components/Home/Header";
import DetailsSection from "@/components/Home/DetailsSection";
import Community from "@/components/Home/Community";
import TheirWords from "@/components/Home/TheirWords";
import Ratings from "@/components/Home/Ratings";

const page = () => {
  return (
    <div>
      <Header />
      <DetailsSection />
      <TheirWords/>
      <Community />
     <Ratings/>
    </div>
  );
};

export default page;
