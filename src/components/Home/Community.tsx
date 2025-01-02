import React from "react";
import Container from "../Container";
import Image from "next/image";
import img1 from "@/assets/images/community1.png";
import img2 from "@/assets/images/community2.png";
import img3 from "@/assets/images/community3.png";

const Community = () => {
  return (
    <div
      style={{
        background: `url(./community-bg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <Container className="">
        <h3 className=" text-2xl md:text-3xl lg:text-5xl font-semibold font-syne text-center text-primary">
          Join the Community
        </h3>
        <div className="flex gap-1 md:gap-3 place-items-center px-[6%] my-9 lg:my-12">
          <div className=" w-7/12 h-fit overflow-hidden rounded-lg  drop-shadow">
            <Image
              alt="header-image"
              src={img1}
              className="w-full h-full object-cover rounded-lg"
              width={2000}
              height={1000}
            />
          </div>
          <div className="w-full h-full overflow-hidden rounded-lg drop-shadow">
            <Image
              alt="header-image"
              src={img2}
              className="w-full h-full object-cover rounded-lg"
              width={2000}
              height={1000}
            />
          </div>
          <div className=" w-7/12 h-fit overflow-hidden rounded-lg drop-shadow">
            <Image
              alt="header-image"
              src={img3}
              className="w-full h-full object-cover rounded-lg"
              width={2000}
              height={1000}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Community;
