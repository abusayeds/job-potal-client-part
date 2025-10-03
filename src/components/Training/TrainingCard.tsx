import React from "react";
import { Button } from "antd";
import { TTraining } from "@/types/training.type";
import Image from "next/image";
import { MdOutlineCalendarMonth, MdOutlineLocalOffer } from "react-icons/md";
import { PiFolderOpen } from "react-icons/pi";
import { RiTimeLine } from "react-icons/ri";
import { imageUrl } from "@/config";
import { convertToLocalTime, getTimezone } from "@/lib/localTimeConverter";
import Link from "next/link";

const TrainingCard = ({ data }: { data: TTraining }) => {
  return (
    <div className="">
      <div className="grid grid-cols-12 border border-gray-200 lg:divide-x divide-gray-200">
        <div className="col-span-12 lg:col-span-3 w-full h-full p-0.5">
          <Image
            src={imageUrl + data?.image}
            alt="Training"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-evenly gap-3 p-7">
          <h3 className="text-lg lg:text-2xl font-bold line-clamp-2">
            {data?.title ?? "N/A"}
          </h3>
          <div className="line-clamp-3">
            <div  className="no-tailwind" dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
          {/* <p className="text-gray-600 line-clamp-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            labore ipsa tempore voluptate laudantium sed a soluta molestias.
            Nulla nobis sit repellendus, quos odit atque, voluptatibus
            accusamus, ullam beatae aliquam ipsum dolorem deleniti iure
            necessitatibus reiciendis fugiat ipsa a ex minima. Architecto fugit
            officia rerum nam sunt iusto velit ea.
          </p> */}
        </div>
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-1.5 py-5 lg:py-7 px-7 text-sm xl:text-base">
          <div className="flex gap-2 items-center">
            <MdOutlineCalendarMonth className="shrink-0" size={20} />
            <p className="font-semibold text-gray-700">
              {new Date(data.date).toDateString()}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <RiTimeLine className="shrink-0" size={18} />
            <p className="font-medium text-gray-700">
              {data.time[0]} - {data.time[1]}
            </p>
          </div>
          <div className="flex gap-2">
            <MdOutlineLocalOffer className="shrink-0 mt-0.5" size={20} />
            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Local Time</p>
              <p className="text-gray-500 font-medium text-sm">
                Zone: {getTimezone(data.date)}
              </p>
              <p className="text-gray-500 font-medium text-sm">
                Date:{" "}
                {new Date(data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-500 font-medium text-sm">
                Time: {convertToLocalTime(data.time[0])} -{" "}
                {convertToLocalTime(data.time[1])}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <PiFolderOpen className="shrink-0" size={20} />
            <p className="font-semibold text-gray-700">
              {data.category ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 lg:px-7 py-2 border border-t-0 border-gray-200 flex justify-end">
        <Link href={`/training/${data._id}`} className="w-full md:w-fit">
          <Button size="large" block>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TrainingCard;
