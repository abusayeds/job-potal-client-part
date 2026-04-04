import { formatTwoDigits } from "@/lib/getTwoDisit";
import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import React, { createElement } from "react";
import { BsBagCheck, BsBagHeart } from "react-icons/bs";
import { PiBuildingsLight } from "react-icons/pi";

const AuthOverview = ({
  data,
  className,
}: {
  data: TUniObject;
  className?: string;
}) => {
  const statusDatas = [
    {
      value: formatTwoDigits(data?.data?.activeJobs) ?? "N/A",
      title: "Live Job",
      icon: BsBagCheck,
    },
    {
      value: formatTwoDigits(data?.data?.companies) ?? "N/A",
      title: "Companies",
      icon: PiBuildingsLight,
    },
    { value: formatTwoDigits(data?.data?.newJobs) ?? "N/A", title: "New Job", icon: BsBagHeart },
  ];
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-end items-center gap-4",
        className
      )}
    >
      <div className="w-full max-w-xs sm:max-w-sm 2xl:max-w-md lg:sticky bottom-0">
        <h3 className="text-2xl xl:text-3xl font-roman text-white">
          Over {formatTwoDigits(data?.data?.candidates) ?? "00"} candidates waiting for good
          employments.
        </h3>
        <div className="flex justify-between items-center gap-3 sm:gap-4 mt-10">
          {statusDatas.map((item) => (
            <div key={item.title} className="space-y-3">
              <div className="text-white bg-primary/20 p-3 xl:p-4 rounded-lg w-fit">
                {createElement(item.icon, { size: 28 })}
              </div>
              <div className="text-white">
                <p className="text-xl sm:text-2xl">{item.title}</p>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthOverview;
