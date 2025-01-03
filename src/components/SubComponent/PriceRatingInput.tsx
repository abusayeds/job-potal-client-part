/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { ratingColorPicker } from "@/utils";
import React, { useEffect, useState } from "react";

type TRatingInProps = {
  label: string;
  setReviewData: (data: { [key: string]: any }) => void;
  fieldName: string;
};

export default function PriceRatingInput({
  label,
  setReviewData,
  fieldName,
}: TRatingInProps) {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    setReviewData((c: any) => ({ ...c, [fieldName]: rating }));
  }, [rating]);

  return (
    <div className="space-y-4">
      <p className="text-base lg:text-lg text-black">{label}</p>
      <div className="space-y-3.5">
        <div className="w-full flex flex-nowrap justify-center gap-3 sm:gap-4 lg:gap-7">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              style={{
                background:
                  star <= rating ? ratingColorPicker(rating).color : "#C1C1C1",
              }}
              className="outline-none h-12 sm:h-14 lg:h-16 w-12 sm:w-14 lg:w-16 rounded-full"
            />
          ))}
        </div>
        <div className="flex justify-around text-gray-500 text-sm md:text-base">
          <p
            className={cn("", {
              invisible: rating > 0,
            })}
          >
            $
          </p>
          <p
            className={cn("", {
              invisible: rating < 1,
            })}
          >
           {rating}. {[...Array(rating)].map((_i) => "$")}
          </p>
          <p
            className={cn("", {
              invisible: rating > 0,
            })}
          >
            $$$$$
          </p>
        </div>
      </div>
    </div>
  );
}
