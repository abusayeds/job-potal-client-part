import Container from "@/components/Container";
import BecomeUser from "@/components/Home/BecomeUser";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatTwoDigits } from "@/lib/getTwoDisit";
import { appStatus } from "@/services";
import Image from "next/image";
import React, { createElement } from "react";
import { BsBagCheck } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiBuildingsLight } from "react-icons/pi";

const page = async () => {
  const data = await appStatus();
  const stats = [
    {
      icon: BsBagCheck,
      count: formatTwoDigits(data?.data?.activeJobs) ?? "N/A",
      label: "Live Job",
    },
    {
      icon: PiBuildingsLight,
      count: formatTwoDigits(data?.data?.companies) ?? "N/A",
      label: "Companies",
    },
    {
      icon: HiOutlineUserGroup,
      count: formatTwoDigits(data?.data?.candidates) ?? "N/A",
      label: "Candidates",
    },
  ];

  return (
    <>
      <Container
        className="bg-lightgray"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">About Us</p>
        <p className="text-sm">
          <span className="text-brand/60">Home</span> / About Us
        </p>
      </Container>
      <Container mClassName="space-y-5">
        {/* <p className="text-primary">Who we are</p> */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-x-5 gap-y-10">
          <div className="col-span-1 lg:col-span-7 space-y-2 lg:space-y-3">
            <SectionHeading className="max-w-2xl font-roman">
              We are a highly skilled and professional team, dedicated to
              delivering exceptional results
            </SectionHeading>
            <p className="max-w-3xl lg:text-2xl text-brand/60">
              We&apos;re more than just a Job Board. We&apos;re a bridge between
              passionate job seekers and forward-thinking employers. Our mission
              is to simplify the hiring process by providing a smart,
              streamlined platform where companies can find the right talent,
              and individuals can discover careers that truly fit their skills
              and aspirations.
            </p>
          </div>
          <div className="col-span-1 lg:col-span-4 w-full flex lg:flex-col justify-around items-center 2xl:items-start gap-4">
            {stats.map((category) => (
              <div
                key={category.label}
                className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-5 w-fit"
              >
                <div className="text-primary">
                  {createElement(category.icon, {
                    className: "size-8 sm:size-10",
                  })}
                </div>
                <div className="space-y-2">
                  <h5 className="text-lg sm:text-xl text-brand font-medium">
                    {category.count}
                  </h5>
                  <p className="text-sm sm:text-base text-brand/60">
                    {category.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-11 gap-2 lg:gap-6 py-6 sm:py-8 xl:py-10">
          <div className="col-span-4">
            <Image
              src={"/images/about/1.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
          <div className="col-span-3 h-full flex flex-col gap-2 lg:gap-6">
            <div className="h-full">
              <Image
                src={"/images/about/2.svg"}
                alt="hero"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
            <div className="h-full">
              <Image
                src={"/images/about/3.svg"}
                alt="hero"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="col-span-4">
            <Image
              src={"/images/about/4.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
        </div>
        {/* <p className="text-primary hidden lg:block">Careers with Us</p> */}
        <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-5">
          <div className="col-span-1 lg:col-span-7 space-y-2 lg:space-y-3">
            <p className="text-primary lg:hidden pb-2">Careers with Us</p>
            <SectionHeading className="max-w-2xl font-roman">
              Our mission is to empower individuals by helping them discover the
              perfect career opportunities tailored to their goals and
              potential.
            </SectionHeading>
            <p className="max-w-3xl lg:text-2xl text-brand/60">
              We guide individuals on a transformative journey to uncover
              meaningful career opportunities that align with their unique
              aspirations, strengths, and long-term potential—empowering them to
              build a future filled with purpose and growth.
            </p>
          </div>
          <div className="col-span-1 lg:col-span-4 order-first lg:order-last">
            <Image
              src={"/images/about/5.svg"}
              alt="hero"
              width={1000}
              height={1000}
              className="w-full max-w-52 lg:max-w-sm mx-auto lg:mx-0"
            />
          </div>
        </div>
      </Container>

      <BecomeUser />
    </>
  );
};

export default page;
