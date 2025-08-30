import Image from "next/image";
import React from "react";
import Container from "../Container";
import JobSearchBar from "./JobSearchBar";
import { TUniObject } from "@/types";
import { formatTwoDigits } from "@/lib/getTwoDisit";

const HeroSection = ({ data }: { data: TUniObject }) => {
  // const [keyword, setKeyword] = useState("");
  // const [location, setLocation] = useState("");
  const statsData = [
    {
      icon: "/images/status/jobs.svg",
      count: formatTwoDigits(data?.data?.totalJobs) ?? "N/A",
      label: "Jobs",
    },
    {
      icon: "/images/status/candidates.svg",
      count: formatTwoDigits(data?.data?.candidates) ?? "N/A",
      label: "Candidates",
    },
    {
      icon: "/images/status/companies.svg",
      count: formatTwoDigits(data?.data?.companies) ?? "N/A",
      label: "Companies",
    },
    {
      icon: "/images/status/new-jobs.svg",
      count: formatTwoDigits(data?.data?.newJobs) ?? "N/A",
      label: "New Jobs",
    },
  ];
  return (
    <div className="relative min-h-full">
      <Image
        src="/images/bgs/Hero.png"
        alt="header"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Container mClassName="h-full flex flex-col lg:flex-row items-center justify-between lg:min-h-[700px]">
        <div className="flex flex-col text-white gap-y-4 lg:gap-y-6 drop-shadow-2xl w-full lg:pr-[5%] xl:pr-[10%]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-tight">
            Find a job that suits your <br /> interest & skills.
          </h3>
          {/* <p className="text-lg lg:text-xl ">
            Aliquam vitae turpis in diam convallis finibus in at risus. <br />{" "}
            Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
          </p> */}
          <JobSearchBar field2="location" extendable={false} className="order-first lg:order-none" />
          <div className="px-4 lg:hidden max-w-lg mx-auto">
            <Image
              src={"/images/computer-user.png"}
              alt="hero"
              width={1000}
              height={1000}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 pt-5">
            {statsData.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className={``}>
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={40}
                    height={40}
                    className="w-12 md:w-14 h-12 md:h-14"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="text-white md:text-xl font-roman-bold">
                    {item.count.toLocaleString()}
                  </div>
                  <div className="text-gray-300 md:text-xl">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" h-fit hidden lg:block lg:w-1/3 ">
          <div className="mt-auto">
            <Image
              src={"/images/computer-user.png"}
              alt="hero"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
