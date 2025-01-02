"use client";

import { cn } from "@/lib/utils";
import React, { Dispatch} from "react";

const ToggleOption = ({
  toggleData,
  setToggleData,
}: {
  toggleData: string;
  setToggleData: Dispatch<React.SetStateAction<string>>;
}) => {
  
  const toggleOptions = [
    "Profile",
    "Account",
    "Ratins",
    "Trainers",
  ];
  return (
    <div className="w-full max-w-3xl flex justify-center border-b-[3px] border-[#FFE6FF]">
      {toggleOptions.map((item) => (
        <button
          onClick={() => setToggleData(item)}
          key={item}
          className="mb-[-2.5px] w-fit group"
        >
          <p className={"px-4 md:px-8 py-2.5 md:py-3 text-sm md:text-base"}>
            {item}
          </p>
          <div
            className={cn(
              "h-[3px] w-0 group-hover:w-full mx-auto bg-[#77CA] duration-300",
              {
                "w-full": toggleData === item,
              }
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default ToggleOption;
