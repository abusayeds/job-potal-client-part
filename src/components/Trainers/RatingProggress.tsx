import { cn } from "@/lib/utils";
import React from "react";
type TProps = {
  className?: string;
  trainer: any
};
const RatingProggress = ({ className, trainer }: TProps) => {
  const totalRatings = Object.keys(trainer)
  .filter((key) => !isNaN(Number(key))) 
  .reduce((sum, key) => sum + trainer[Number(key)], 0);
  const ratings = {
    awesome: trainer[5],
    great: trainer[4],
    good: trainer[3],
    ok: trainer[2],
    awful: trainer[1],
  };
  const calculatePercentage = (value: number) => (value / totalRatings) * 100;
  return (
    <div
      className={cn(
        "px-2 md:px-4 py-6 md:py-8 border lg:border-[3px] border-[#AFACFB] rounded-lg space-y-6",
        className
      )}
    >
      <div className="grid grid-cols-12 gap-5 items-center">
        <h3 className="col-span-3 hidden md:block text-5xl font-semibold text-right">
        <span className="text-[#00C759]"> {trainer?.overallRating ?? 0}</span>
          <span className="text-base font-normal">/5</span>
        </h3>
        <div className="col-span-12 md:col-span-7 space-y-3 text-center">
          <h1 className="col-span-8 text-xl md:text-2xl font-medium text-black">
            Rating Distribution
          </h1>
          <p className="">
            Overall Quality Based on{" "}
            <span className="underline">{totalRatings} ratings</span>
          </p>
        </div>
      </div>
      <div className="space-y-5">
        {Object.entries(ratings).map(([key, value], index) => (
          <div
            key={key}
            className="grid grid-cols-12 gap-2 md:gap-5 items-center text-right text-sm lg:text-base"
          >
            <div className="col-span-3 capitalize flex justify-between">
              <span>{key}</span>{" "}
              <span> {Object.keys(ratings).length - index}</span>
            </div>
            <div className="col-span-7 bg-[#C1C1C1] rounded-full overflow-hidden h-9">
              <div
                style={{ width: `${calculatePercentage(value)}%` }}
                className={`h-full bg-primary`}
              />
            </div>
            <p className="col-span-2 text-left">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingProggress;
