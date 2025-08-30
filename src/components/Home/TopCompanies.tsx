import React from "react";
import Container from "../Container";
import SectionHeading from "../ui/SectionHeading";
import Image from "next/image";
import { TfiLocationPin } from "react-icons/tfi";
import { TUniObject } from "@/types";
import LoaderWraperComp from "../LoaderWraperComp";
import { imageUrl } from "@/config";
import { TUser } from "@/redux/features/auth/authSlice";

const TopCompanies = ({ data }: { data: TUniObject }) => {
  // const companies = [
  //   {
  //     id: 1,
  //     name: "Mercedes",
  //     location: "Dhaka, Bangladesh",
  //     openPositions: 3,
  //     logoUrl: "/test/company.svg",
  //   },
  //   {
  //     id: 2,
  //     name: "FACEBOOK",
  //     location: "Dhaka, Bangladesh",
  //     openPositions: 3,
  //     logoUrl: "/test/company.svg",
  //   },
  //   {
  //     id: 3,
  //     name: "Dribbble",
  //     location: "Dhaka, Bangladesh",
  //     openPositions: 3,
  //     logoUrl: "/test/company.svg",
  //   },
  //   {
  //     id: 4,
  //     name: "JAGUAR",
  //     location: "Dhaka, Bangladesh",
  //     openPositions: 3,
  //     logoUrl: "/test/company.svg",
  //   },
  //   {
  //     id: 5,
  //     name: "Dribbble",
  //     location: "Dhaka, Bangladesh",
  //     openPositions: 3,
  //     logoUrl: "/test/company.svg",
  //   },
  //   {
  //     id: 6,
  //     name: "Goldstock",
  //     location: "Dhaka, Bangladesh",
  //     openPositions: 3,
  //     logoUrl: "/test/company.svg",
  //   },
  // ];

  return (
    <Container className="bg-lightgray">
      <SectionHeading
        title="Top companies"
        className="text-center lg:text-start"
      />
      <LoaderWraperComp
        isLoading={false}
        isError={!data.success}
        error={data}
      >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-3 lg:gap-y-10 mt-8 lg:mt-10">
        {data?.data?.map((company: TUser & { openPositions: number }) => (
          <div
            key={company._id}
            className="bg-white p-4 xl:p-6 rounded-xl drop-shadow-xs"
          >
            <div className="flex  items-center gap-3">
              <div className="max-w-16">
                <Image
                  src={
                    company.logo ? imageUrl + company.logo : "/demo-profile.jpg"
                  }
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-full "
                />
              </div>
              <div className="space-y-1.5">
                <h5 className="sm:text-lg text-brand font-semibold">
                  {company.companyName || "N/A"}
                </h5>
                <div className="flex items-center gap-1 text-brand/50">
                  <TfiLocationPin size={16} />
                  <p className="text-sm sm:text-base line-clamp-1">
                    {company.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-primary text-center font-semibold font-sans pt-6 pb-2">
              Open Position ({company.openPositions})
            </p>
          </div>
        ))}
      </div>
      </LoaderWraperComp>
    </Container>
  );
};

export default TopCompanies;
