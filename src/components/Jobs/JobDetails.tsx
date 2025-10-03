import Image from "next/image";
import React from "react";
import { LuCalendarDays, LuMapPin, LuPhone } from "react-icons/lu";
import { PiBuildings, PiTeaBag } from "react-icons/pi";
import { TbMail } from "react-icons/tb";
import ApplyButton from "./ApplyButton";
import JobOverviewCart from "./JobOverviewCart";
import { RxStopwatch } from "react-icons/rx";
import { BsBagCheck, BsWallet } from "react-icons/bs";
import { TfiLocationPin } from "react-icons/tfi";
import { AiTwotoneExperiment } from "react-icons/ai";
import { VscOrganization } from "react-icons/vsc";
import { cn } from "@/utils/cn";
import { TJobDetails } from "@/types/jobs.type";
import { currencyIcon } from "@/constants";
import { filterData } from "@/constants/filter.const";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import { imageUrl } from "@/config";
import ShareComponent from "../ui/ShareComponent";
import BookmarkButton from "../ui/BookmarkButton";

const JobDetails = ({
  viewType,
  data,
}: {
  viewType?: "dashboard" | "website";
  data: TJobDetails;
}) => {
  // console.log(data)
  const jobDetails = [
    {
      label: "Job Posted",
      icon: LuCalendarDays,
      value: new Date(data.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
    {
      label: "Job Deadline in",
      icon: RxStopwatch,
      value: new Date(data.expirationDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
    {
      label: "Salary",
      icon: BsWallet,
      value: `${currencyIcon[data.currency]}
                ${data.minSalary} - ${data.maxSalary}/${data.salaryType}`,
    },
    {
      label: "Work place",
      icon: TfiLocationPin,
      value: "Work at office",
    },
    {
      label: "Job Type",
      icon: PiTeaBag,
      value: data.jobType,
    },
    {
      label: "Experience",
      icon: AiTwotoneExperiment,
      value: getSpecificLabel(filterData[0].options, data.experience),
    },
    {
      label: "Skill & expertise",
      icon: BsBagCheck,
      value: data.tags
        .slice(0, 2)
        .map((tag, i) => `${i !== 0 ? ", " : ""}` + tag),
    },
    {
      label: "Organization Type",
      icon: VscOrganization,
      value: data.organizationType,
    },
  ];
  return (
    <div>
      <div className="w-full h-[180px] z-0">
        <Image
          src={imageUrl + data.banner}
          alt="background"
          width={1000}
          height={1000}
          // fill
          // sizes="100vw"
          // style={{
          //   objectFit: "cover",
          //   zIndex: -1,
          //   borderRadius: "0.5rem",
          // }}
          className="w-full h-full object-cover rounded-lg drop-shadow-sm"
        />
      </div>
      <div className="-mt-16 w-full px-[7%] lg:px-[5%] drop-shadow-xl">
        <div
          className={cn(
            "w-full flex flex-col lg:flex-row justify-between items-center gap-8 bg-white rounded-lg px-6 py-6 z-10",
            {
              "lg:flex-col xl:flex-row gap-5": viewType === "dashboard",
            }
          )}
        >
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="flex-shrink-0 h-20 w-20 rounded-full overflow-hidden border border-gray-50 drop-shadow-sm">
              <Image
                src={imageUrl + data.logo}
                alt="logo"
                width={500}
                height={500}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="space-y-3 ">
              <h5 className="text-2xl">{data.jobTitle}</h5>
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
                <p className="flex items-center gap-1">
                  <LuMapPin size={19} className="text-brand/60 pb-0.5" />
                  <span>{data.companyId?.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <LuPhone size={18} className="text-brand/60" />
                  <span>+{data.companyId?.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <TbMail size={18} className="text-brand/60" />
                  <span>{data.companyId?.contactEmail}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end gap-3">
            {viewType !== "dashboard" && (
              <div className="flex items-center gap-3">
                <BookmarkButton dataId={data._id}  className="w-6 h-6" size="large" />
                <ApplyButton jobData={data} />
              </div>
            )}
            <p className="text-brand/70">
              Publish Date:{" "}
              <span className="text-brand">
                {new Date(data.scheduleDate).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-5 xl:gap-10 2xl:gap-16 mt-12 lg:divide-x divide-gray-200",
          {
            "lg:grid-cols-1 2xl:grid-cols-9 lg:divide-x-0 lx:divide-x":
              viewType === "dashboard",
          }
        )}
      >
        <div className="col-span-1 lg:col-span-5 space-y-8 lg:pr-4 2xl:pr-8">
          <div>
            <h5 className="font-semibold mb-3 text-brand">Job Description</h5>
            {data.description ? (
              <div
                className="no-tailwind"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              ></div>
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-brand">Educations</h5>
            <div className="text-brand/70">
              <ul className="list-disc pl-10 space-y-3">
                {data.educations.map((degree, index) => (
                  <li key={index}>{degree}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-brand">Responsibilities</h5>
            {data.responsibilities ? (
              <div
                className="no-tailwind"
                dangerouslySetInnerHTML={{
                  __html: data.responsibilities,
                }}
              ></div>
            ) : (
              <p>N/A</p>
            )}
          </div>
          {/* {viewType === "website" && ( */}
          <div className="flex gap-3 items-center flex-wrap">
            <span className="pr-2 text-lg whitespace-pre w-full">
              Share here :
            </span>{" "}
            <ShareComponent shareUrl={"/find-job/" + data._id} />
            {/* {shareLinks.map(
                (link, index) =>
                  link.url && (
                    <Button
                      key={index}
                      href={link.url}
                      target="_blank"
                      size="large"
                      style={{ height: "40px" }}
                    >
                      <link.icon size={20} /> {link.label}
                    </Button>
                  )
              )} */}
          </div>
          {/* )} */}
        </div>
        <div
          className={cn(
            "col-span-1 lg:col-span-4 space-y-8 order-first lg:order-last",
            {
              " order-first lg:order-first xl:order-last":
                viewType === "dashboard",
            }
          )}
        >
          <div className="flex flex-col lg:flex-row justify-around items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200 py-5">
            <div className="text-center space-y-1.5 w-fit lg:w-full py-4 lg:py-0">
              <p className="font-roman-bold">Salary ({data.currency})</p>
              <h6 className=" text-xl xl:text-2xl text-[#0BA02C]">
                {currencyIcon[data.currency]}
                {data.minSalary} - {currencyIcon[data.currency]}
                {data.maxSalary}
              </h6>
              <p className="text-brand/60">{data.salaryType}</p>
            </div>
            <div className="text-center space-y-1.5 w-fit lg:w-full py-4">
              <PiBuildings size={35} className="mx-auto" />
              <p className="font-roman-bold">Job Location</p>
              <p className="text-brand/60">{data.location}</p>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-brand">Job Benefits</h5>
            <div className="flex flex-wrap gap-3">
              {data.jobBenefits.map((benefit, index) => (
                <p
                  key={index}
                  className="bg-[#FCECEC] text-[#0BA02C] min-w-24 py-1 px-4 rounded-md"
                >
                  {benefit}
                </p>
              ))}
            </div>
          </div>
          <div className="">
            <h5 className="font-bold text-lg sm:text-xl mb-6 text-brand">
              Job Overview
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-8">
              {jobDetails.map((detail, index) => (
                <JobOverviewCart data={detail} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
