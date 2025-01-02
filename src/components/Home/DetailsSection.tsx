import Image from "next/image";
import React from "react";
import Container from "../Container";
import detailsImage from "@/assets/images/details-img.jpg";

const DetailsSection = () => {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:divide-x divide-primary">
      <div className="w-full h-full overflow-hidden max-h-[45vh] lg:pr-12 order-last lg:order-first">
        <Image
          alt="header-image"
          src={detailsImage}
          className="w-full h-full object-cover"
          width={2000}
          height={1000}
        />
      </div>
      <div className="lg:px-12 h-full flex flex-col justify-center gap-3.5 md:gap-4 lg:gap-6 text-center lg:text-left">
        <h3 className=" text-2xl md:text-3xl lg:text-5xl font-semibold font-syne max-w-[20ch] mx-auto lg:ml-0 leading-snug text-primary">
          Discover the Best Fitness Trainers and Studios
        </h3>
        <p className="text-sm md:text-base leading-relaxed">
          R8 My Trainers is the go-to platform for sharing your experiences with
          different fitness trainers and studios. Whether it&lsquo;s Pilates, boxing,
          yoga, or any other fitness discipline, our community relies on your
          valuable insights to make informed decisions.
        </p>
      </div>
    </Container>
  );
};

export default DetailsSection;
