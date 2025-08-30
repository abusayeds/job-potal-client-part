"use client";

import React, { useState } from "react";
import Container from "../Container";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Image from "next/image";
import { Button } from "antd";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const WorkProcess = () => {
  const [employeeOrSeeker, setEmployeeOrSeeker] = useState("seeker");

  const containerVariants = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.2,
        // when: "beforeChildren",
      },
    },
  };

  // Animation variants for the image
  // const imageVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.7,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  // // Floating animation for subtle movement
  // const floatingAnimation = {
  //   y: [0, -10, 0],
  //   transition: {
  //     duration: 4,
  //     repeat: Infinity,
  //     repeatType: "reverse",
  //     ease: "easeInOut",
  //   },
  // };
  return (
    <Container className="bg-lightgray">
      <SectionHeading className="text-center">
        How RemotisJobs work For <br className="lg:hidden" />{" "}
        {employeeOrSeeker === "employee" ? "Employers" : "Job Seekers"}
      </SectionHeading>
      {employeeOrSeeker === "employee" ? (
        <motion.div
          className=""
          initial="hidden"
          animate={employeeOrSeeker === "employee" ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="w-full py-10 lg:py-14 drop-shadow-lg px-4">
            <Image
              src={"/images/work-process/employee-process.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-auto hidden lg:block"
            />
            <Image
              src={"/images/work-process/employee-process-sm.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-auto lg:hidden"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className=""
          initial="hidden"
          animate={employeeOrSeeker === "seeker" ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="w-full py-10 lg:py-14 drop-shadow-lg px-4">
            <Image
              src={"/images/work-process/seeker-process.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-auto hidden lg:block"
            />
            <Image
              src={"/images/work-process/seeker-process-sm.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-auto lg:hidden"
            />
          </div>
        </motion.div>
      )}
      <div className="flex justify-center items-center gap-2">
        <Button
          onClick={() => setEmployeeOrSeeker("employee")}
          type={employeeOrSeeker === "employee" ? "primary" : "default"}
          shape="circle"
          size="large"
        >
          <IoMdArrowBack size={22} />
        </Button>
        <Button
          onClick={() => setEmployeeOrSeeker("seeker")}
          type={employeeOrSeeker === "seeker" ? "primary" : "default"}
          shape="circle"
          size="large"
        >
          <IoMdArrowForward size={22} />
        </Button>
      </div>
    </Container>
  );
};

export default WorkProcess;
