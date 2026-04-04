import { imageUrl } from "@/config";
import { TJobDetails } from "@/types/jobs.type";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiBriefcase, BiCalendar } from "react-icons/bi";
import { FaGraduationCap, FaRegBookmark } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import BookmarkButton from "../ui/BookmarkButton";

const JobCard = ({
  jobData,
  viewType,
  isFavorite = false,
}: {
  jobData: TJobDetails;
  viewType?: "dashboard" | "website";
  isFavorite?: boolean;
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-0">
        <div className="flex-1">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2 line-clamp-1">
              {jobData?.jobTitle}
              <span className="text-gray-500 font-medium text-sm">
                {" "}
                ({jobData?.jobType})
              </span>
            </h2>
            {(viewType !== "dashboard" || isFavorite) && (
              <div className="absolute lg:static top-4 right-4 bg-white rounded-full">
                <BookmarkButton
                  dataId={jobData?._id}
                  className="w-5 h-5"
                  shape="circle"
                />
              </div>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            {jobData?.companyId?.companyName ?? "N/A"}
          </h3>
        </div>
        <div className="lg:ml-4 flex-shrink-0 w-20 xl:w-24 order-first lg:order-last drop-shadow-xs">
          <Image
            src={imageUrl + jobData?.logo}
            alt="logo"
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        {/* Location */}
        <div className="flex items-center text-gray-600">
          <LuMapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{jobData?.location ?? "N/A"}</span>
        </div>

        {/* Education Requirements */}
        <div className="flex items-start text-gray-600">
          <FaGraduationCap className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm leading-relaxed">
            {jobData?.educations.map((degree: string, index: number) => (
              <span key={index} className="line-clamp-2">
                {degree}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center text-gray-600">
          <BiBriefcase className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">
            At least {jobData?.experience} year(s)
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div className="flex items-center text-gray-500">
          <BiCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            <span className="font-medium">Deadline:</span>{" "}
            {new Date(jobData?.expirationDate).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <Link href={`/find-job/${jobData?._id}`} className="flex-shrink-0">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
