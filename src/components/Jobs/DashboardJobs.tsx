import { TRole } from "@/types";
import { cn } from "@/utils/cn";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { createElement } from "react";
import { CgClose } from "react-icons/cg";
import { GoCheck, GoDotFill } from "react-icons/go";
import { LuUserRoundCheck } from "react-icons/lu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import EmployerJobOption from "../ui/EmployerJobOption";
import { TJobDetails } from "@/types/jobs.type";
import { imageUrl } from "@/config";
import { currencyIcon } from "@/constants";

// This component displays a list of jobs in the dashboard, allowing candidate to view job details or applicants based on their role.
export const DashboardJobs = ({
  viewType,
  data,
}: {
  viewType: TRole;
  data: (TJobDetails & { jobId: string; appliedDate: string })[];
}) => {
  const isExpired = (date: string) => {
    const dateValue = new Date(date);
    const isDate = !isNaN(dateValue.getTime());
    if (isDate) {
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } else {
      return false;
    }
  };

  return (
    <div className="space-y-3">
      <div className="hidden md:grid grid-cols-11 xl:grid-cols-12 gap-4 items-center px-6 py-4 bg-lightgray rounded-lg text-sm text-brand/70 uppercase font-sans">
        <p className="col-span-5 xl:col-span-6">Job</p>
        {viewType === "candidate" && (
          <p className="col-span-2 text-center">Applied Date</p>
        )}
        <p className="col-span-1 text-center">Status</p>
        {viewType !== "candidate" && (
          <p className="col-span-2 text-center">APPLICATIONS</p>
        )}
        <p className="col-span-2 text-end">Action</p>
      </div>
      <div className="space-y-0.5">
        {data.map((job, index) => (
          <div
            key={job._id}
            className={cn(
              "grid grid-cols-11 xl:grid-cols-12 gap-3 md:gap-2.5 2xl:gap-4 items-center bg-white hover:drop-shadow-lg px-4 py-6 md:py-4 hover:rounded-xl border-t border-t-gray-200 hover:ring-1 ring-primary group",
              { "border-t-0": index === 0 }
            )}
          >
            <div className="col-span-11 md:col-span-5 xl:col-span-6 flex flex-col md:flex-row gap-2.5 sm:gap-3 items-center">
              {viewType === "candidate" && (
                <div className="flex-shrink-0 w-20 md:w-16 drop-shadow-xs">
                  <Image
                    src={imageUrl + job.logo}
                    alt="logo"
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <div className="space-y-1 xl:space-y-2">
                <h5 className="font-medium md:line-clamp-1 text-center md:text-start">
                  {job.jobTitle}
                </h5>
                <div className="flex lg:flex-col xl:flex-row gap-0.5 xl:gap-1.5 xl:items-center justify-center md:justify-start text-sm text-brand/70">
                  <div className="flex items-center gap-1">
                    {viewType === "candidate" ? (
                      <>
                        <TfiLocationPin size={14} />
                        <p>{job.location}</p>
                      </>
                    ) : (
                      <span>{job.jobType}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GoDotFill size={14} className="shrink-0" />
                    <p>
                      {viewType === "candidate"
                        ? `${currencyIcon[job.currency]}
                                        ${job.minSalary}-${job.maxSalary}/${
                            job.salaryType
                          }`
                        : isExpired(job.expirationDate) || job.expirationDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {viewType === "candidate" && (
              <p className="col-span-11 md:col-span-2 text-center text-sm text-brand/70">
                <span className="md:hidden">Applied Date:</span>
                {new Date(job.appliedDate).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
            <div
              className={cn(
                "col-span-11 md:col-span-1 flex justify-center items-center gap-1 text-sm text-brand/70",
                {
                  "text-green-400": !isExpired(job.expirationDate),
                }
              )}
            >
              {createElement(
                !isExpired(job.expirationDate) ? GoCheck : CgClose,
                {
                  className: "h-3 w-3 border rounded-full shrink-0",
                }
              )}
              {!isExpired(job.expirationDate) ? "Active" : "Expire"}
            </div>
            {viewType !== "candidate" && (
              <p className="col-span-11 md:col-span-2 flex justify-center items-center gap-1 text-brand/70">
                <LuUserRoundCheck className="w-4 h-4 shrink-0" />{" "}
                <span>{job.allApplication} Applications</span>
              </p>
            )}
            <div className="col-span-11 md:col-span-3 flex justify-center md:justify-end gap-2">
              <Link
                href={`/personal-jobs/${
                  viewType === "candidate"
                    ? job.jobId
                    : `applicants?job=${job._id}`
                }`}
                className="w-full max-w-36 xl:max-w-40"
              >
                <button
                  // onClick={() => router.push("/sign-up")}
                  className=" w-full max-w-36 xl:max-w-40 px-4 py-2 text-sm font-sans rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 group-hover:bg-blue-600 active:ring-blue-200"
                >
                  View {viewType === "candidate" ? "Details" : "Applicants"}
                </button>
              </Link>
              {viewType !== "candidate" && (
                <Popover
                  content={<EmployerJobOption job={job} />}
                  // title="Title"
                  trigger="click"
                  placement="bottomRight"
                  //   onOpenChange={setOpenPopover}
                  //   open={openPopover}
                >
                  <button className="px-2.5 py-2 text-sm font-sans rounded-sm focus:outline-none cursor-pointer outline-0 hover:bg-blue-100 active:ring-blue-200">
                    <PiDotsThreeOutlineVerticalFill size={16} />
                  </button>
                </Popover>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
