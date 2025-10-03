import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TfiLocationPin } from "react-icons/tfi";
import SeekerOption from "./SeekerOption";
import { TUser } from "@/redux/features/auth/authSlice";
import { imageUrl } from "@/config";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import BookmarkButton from "../ui/BookmarkButton";
import { filterData } from "@/constants/filter.const";

const SeekerCard = ({
  seeker,
  application,
  viewType,
  className,
}: {
  seeker: TUser & { candidateId?: string };
  application?: TUniObject;
  viewType: "dashboard" | "client" | "saved";
  className?: string;
}) => {
  return (
    <div
      key={seeker._id}
      className={cn(
        "flex flex-col md:flex-row justify-between items-center gap-5 md:gap-2.5 2xl:gap-4 bg-white hover:drop-shadow-lg px-4 py-6 md:py-4 group relative",
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div
          className={cn("flex-shrink-0 w-20 h-20 drop-shadow-xs", {
            "md:w-14 md:h-14": viewType === "dashboard",
          })}
        >
          <Image
            src={imageUrl + seeker.logo}
            alt="logo"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1 xl:space-y-1.5">
          <div className="space-y-1.5 text-center md:text-start">
            <h5 className="font-semibold text-xl md:line-clamp-1">
              {seeker.fullName}
            </h5>
            <p className="text-brand/60">{seeker.candidateId}</p>
          </div>
          {viewType === "client" && (
            <div className="flex flex-col xl:flex-row gap-1 xl:gap-1.5 items-center lg:items-start xl:items-center justify-center md:justify-start text-sm sm:text-base text-brand/70">
              <div className="flex items-center gap-1">
                <TfiLocationPin size={14} className="shrink-0" />
                <p>{seeker.address ?? "N/A"}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <GoDotFill size={14} className="shrink-0" />
                <p>
                  {getSpecificLabel(
                    filterData[0].options,
                    seeker?.experience as string,
                    "-"
                  )}{" "}
                  experience
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center md:justify-end items-center gap-2">
        {viewType !== "dashboard" && (
          <div className="absolute md:static top-4 right-4 bg-white rounded-full">
            <BookmarkButton
              dataId={
                viewType === "saved"
                  ? (seeker.candidateId as string)
                  : seeker._id
              }
              className="w-5 h-5"
              shape="circle"
            />
          </div>
        )}
        <div className="flex justify-center md:justify-end gap-2 md:items-center">
          {viewType === "dashboard" && (
            <p className="whitespace-pre text-sm">
              Apllied:{" "}
              {new Date(application?.appliedDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
          {viewType !== "saved" ? (
            <Link
              href={
                viewType === "client"
                  ? `/job-seekers/${seeker._id}`
                  : `applicants/${application?._id}`
              }
              className="w-full max-w-36 xl:max-w-48"
            >
              <button className=" w-full px-6 py-2 text-sm font-sans rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 group-hover:bg-blue-600 active:ring-blue-200 flex flex-nowrap justify-center items-center gap-2 whitespace-pre">
                {viewType !== "dashboard" ? "View Profile" : "View Application"}
                {/* <FaArrowRightLong size={16} className="mt-1" /> */}
              </button>
            </Link>
          ) : (
            <a
              href={`/job-seekers/${
                viewType === "saved" ? seeker.candidateId : seeker._id
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full px-6 py-2 text-sm font-sans rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 group-hover:bg-blue-600 active:ring-blue-200 flex flex-nowrap justify-center items-center gap-2 whitespace-pre">
                {"View Profile"}
                <FaArrowRightLong size={16} className="mt-1" />
              </button>
            </a>
          )}
          {viewType === "dashboard" && (
            <Popover
              className="absolute md:static top-4 right-3"
              content={<SeekerOption seeker={seeker} />}
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
    </div>
  );
};

export default SeekerCard;
