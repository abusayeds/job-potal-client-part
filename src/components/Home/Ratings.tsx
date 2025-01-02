import React from "react";
import Container from "../Container";
import img1 from "@/assets/images/rate-img1.png";
import img2 from "@/assets/images/rate-img3.png";
import img3 from "@/assets/images/rate-img3.png";
import Image from "next/image";

const Ratings = () => {
  const ratings = [
    {
      text: "Rate trainers and studios easily",
      img: img1,
    },
    {
      text: "Ratings are always anonymous",
      img: img2,
    },
    {
      text: "Manage and edit your ratings",
      img: img3,
    },
  ];
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center my-8 lg:my-10 px-[6%]">
        {ratings.map((item, index) => (
          <div
            key={index}
            className="h-full flex flex-col items-center justify-between px-14 py-8 space-y-4 max-w-[400px] drop-shadow-sm"
          >
            <div className="w-full h-full overflow-hidden">
              <Image
                alt="rating"
                src={item.img}
                className="w-full h-full object-cover"
                width={2000}
                height={1000}
              />
            </div>
            <h5 className="px-4 md:px-0 text-xl md:text-2xl font-medium text-primary text-center">{item.text}</h5>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Ratings;
