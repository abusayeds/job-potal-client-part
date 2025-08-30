"use client";

import Container from "../Container";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";
import { TUniObject } from "@/types";
import LoaderWraperComp from "../LoaderWraperComp";
import { TJobCategory } from "@/types/category.type";
import Image from "next/image";
import { imageUrl } from "@/config";

const PopularCategory = ({ data }: { data: TUniObject }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // console.log(data);
  return (
    <Container className="lg:min-h-[500px] flex items-center bg-[#FFFFFF]">
      <SectionHeading
        title="Popular Category"
        className="text-center lg:text-left"
      />

      <LoaderWraperComp
        isLoading={false}
        isError={!data.success}
        error={data}
      >
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-3 lg:gap-y-10 mt-8 lg:mt-10">
          {data?.data?.map((category: TJobCategory, index: number) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                bounce: 0.4,
                type: "spring",
              }}
              className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 hover:bg-white hover:drop-shadow-xl py-3 px-2 sm:px-3 rounded-lg transition-all"
            >
              <div className="text-primary bg-primary/20 p-3 sm:p-4 rounded-lg max-w-52">
                <Image
                  src={imageUrl + category.logo}
                  alt="Logo"
                  height={100}
                  width={100}
                  // fill
                  // style={{ objectFit: "cover" }}
              className="h-6 w-6 sm:h-7 sm:w-7 object-cover"
                />
                
              </div>
              {/* <div className="relative w-full h-full rounded-lg max-w-24 aspect-[4/1]">
                <Image
                  src={imageUrl + category.logo}
                  alt="Logo"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                />
              </div> */}
              <div className="space-y-1.5 h-full flex flex-col justify-evenly sm:justify-center">
                <h5 className="text-lg sm:text-xl text-brand">
                  {category.catagoryType}
                </h5>
                <p className="text-sm sm:text-base text-brand/60">
                  {category.jobPostCount} Open position
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </LoaderWraperComp>
    </Container>
  );
};

export default PopularCategory;
