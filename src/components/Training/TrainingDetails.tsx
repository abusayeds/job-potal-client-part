import React from "react";
import Image from "next/image";
import ShareComponent from "../ui/ShareComponent";
import { MdOutlineCalendarMonth, MdOutlineLocalOffer } from "react-icons/md";
import { RiTimeLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TiFolderOpen } from "react-icons/ti";
import { TTraining } from "@/types/training.type";
import { imageUrl } from "@/config";
import { convertToLocalTime, getTimezone } from "@/lib/localTimeConverter";
import RegistrationButton from "./RegistrationButton";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import { trainingFilter } from "@/constants/filter.const";

const TrainingDetails = ({ data }: { data: TTraining }) => {
  //   console.log(data);
  return (
    <div className="grid grid-cols-12 gap-y-10 lg:gap-y-0 lg:gap-x-10 2xl:gap-x-16 py-6 lg:py-8 xl:py-10 w-full">
      <div className="col-span-12 lg:col-span-8">
        <div>
          <Image
            src={imageUrl + data?.image}
            alt="Training"
            width={1000}
            height={1000}
          />
        </div>
        <div className="mt-6 lg:mt-10 max-w-2xl 2xl:max-w-3xl mx-auto space-y-1.5">
          <h4 className="text-xl md:text-2xl lg:text-4xl font-semibold leading-normal pb-2">
            {data?.title ?? "N/A"}
          </h4>
          <div className="">
            <span className="font-semibold">Format: </span>
            <span className="text-gray-600">{getSpecificLabel(trainingFilter[1].options, data.format) ?? "N/A"}</span>
          </div>
          <div className="">
            <span className="font-semibold">Date: </span>
            <span className="text-gray-600">
              {new Date(data?.date).toDateString() ?? "N/A"}
            </span>
          </div>
          <div className="">
            <span className="font-semibold">Duration: </span>
            <span className="text-gray-600">{data.duration ?? "N/A"}</span>
          </div>
          {/* <div className="">
            <span className="font-semibold">Instructor: </span>
            <span className="text-gray-600">{data.Instructor ?? "N/A"}</span>
          </div> */}
          {/* <div className="">
            <span className="font-semibold">Learning Credits: </span>
            <span className="text-gray-600">
              {data.learning_credits ?? "N/A"}
            </span>
          </div> */}
        </div>
        <div className="shadow-2xl w-full h-[1px] bg-gray-200 my-6 lg:my-10" />
        <div  className="no-tailwind" dangerouslySetInnerHTML={{ __html: data.description }}></div>
        <div className="pt-5">
          <span className="text-lg whitespace-pre border-b border-gray-300 pb-1">
            Share this:
          </span>{" "}
          <ShareComponent shareUrl={`/training/${data._id}`} className="mt-4" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-10">
        <div className="border border-gray-200 rounded-sm p-10 space-y-8">
          <div className="flex gap-3">
            <MdOutlineCalendarMonth className="shrink-0" size={24} />
            <div className="space-y-1.5">
              <p className="text-lg font-bold text-gray-700 uppercase">Date</p>
              <p className="text-gray-500 font-medium">
                {new Date(data.date).toDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <RiTimeLine className="shrink-0" size={24} />
            <div className="space-y-1.5">
              <p className="text-lg font-bold text-gray-700 uppercase">
                Time{" "}
                <span className="text-[9px] font-normal text-gray-500 italic">
                  EDT
                </span>
              </p>
              <p className="text-gray-500 font-medium">
                {data.time[0]} - {data.time[1]}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <MdOutlineLocalOffer className="shrink-0" size={24} />
            <div className="space-y-1.5">
              <p className="text-lg font-bold text-gray-700 uppercase">
                Local Time
              </p>
              <p className="text-gray-500 font-medium">
                Timezone: {getTimezone(data.date)}
              </p>
              <p className="text-gray-500 font-medium">
                Date:{" "}
                {new Date(data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-500 font-medium">
                Time: {convertToLocalTime(data.time[0])} -{" "}
                {convertToLocalTime(data.time[1])}
              </p>
            </div>
          </div>
          {data.format === "in_person" && (
            <div className="flex gap-3">
              <HiOutlineBuildingOffice2 className="shrink-0" size={24} />
              <div className="space-y-1.5">
                <p className="text-lg font-bold text-gray-700 uppercase">
                  Address
                </p>
                <p className="text-gray-500 font-medium">
                  {data.address ?? "N/A"}
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <TiFolderOpen className="shrink-0" size={24} />
            <div className="space-y-1.5">
              <p className="text-lg font-bold text-gray-700 uppercase">
                Category
              </p>
              <p className="text-gray-500 font-medium">
                {data.category ?? "N/A"}
              </p>
            </div>
          </div>
          <RegistrationButton trainingId={data._id} />
        </div>
        <div className="border border-gray-200 rounded-sm p-10 space-y-8 text-center">
          <h6 className="font-bold text-lg uppercase border-b-4 border-gray-300 pb-2.5">
            Company
          </h6>
          <div className="pb-4">
            <div className="flex-shrink-0 h-20 w-20 rounded-full overflow-hidden border border-gray-50 drop-shadow-sm mx-auto mb-2.5">
              <Image
                src={imageUrl + data.employeId?.logo}
                alt="logo"
                width={500}
                height={500}
                className="object-cover h-full w-full"
              />
            </div>
            <p className="font-bold mb-0.5">
              {data.employeId?.companyName ?? "N/A"}
            </p>
            <p className="text-gray-500 font-medium text-sm mb-1">
              {data.employeId?.address ?? "N/A"}
            </p>
            <a
              className="text-sm underline hover:text-blue-600"
              href={`mailto:${data.employeId?.email ?? "N/A"}`}
            >
              Email: {data.employeId?.contactEmail ?? "N/A"}
            </a>
            <br />
            <a
              href={data.employeId?.companyWebsite}
              target="_blank"
              className="text-sm underline hover:text-blue-600"
            >
              {data.employeId?.companyWebsite}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetails;
