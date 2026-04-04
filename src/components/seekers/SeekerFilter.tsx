import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const filterData = [
  {
    category: "Experience",
    inputType: "radio",
    options: [
      { label: "Freshers", value: "freshers" },
      { label: "1 - 2 Years", value: "1-2-years" },
      { label: "2 - 4 Years", value: "2-4-years" },
      { label: "4 - 6 Years", value: "4-6-years" },
      { label: "6 - 8 Years", value: "6-8-years" },
      { label: "8 - 10 Years", value: "8-10-years" },
      { label: "10 - 15 Years", value: "10-15-years" },
      { label: "15+ Years", value: "15-plus-years" },
    ],
  },
  {
    category: "Education",
    inputType: "checkbox",
    options: [
      { label: "All", value: "all" },
      { label: "High School", value: "high-school" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Graduation", value: "graduation" },
      {
        label: "Associate Degree",
        value: "associate-degree",
      },
      { label: "Bachelor Degree", value: "bachelor-degree" },
      { label: "Master Degree", value: "master-degree" },
      { label: "PhD", value: "phd" },
    ],
  },
  {
    category: "Gender",
    inputType: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Others", value: "others" },
    ],
  },
];

const SeekerFilter = ({ className }: { className?: string }) => {
  const [openCategory, setOpenCategory] = useState("");
  return (
    <div className={cn("", className)}>
      <div className="lg:border-r border-gray-300 flex flex-col divide-y divide-gray-300 w-full">
        {/* First element from filterData */}
        {filterData.length > 0 && (
          <div className="pb-2 order-1">
            <button
              className="outline-0 w-full text-lg 2xl:text-xl font-semibold p-3 pt-0 text-brand flex justify-between items-center"
              onClick={() =>
                setOpenCategory((c) =>
                  c !== filterData[0].category ? filterData[0].category : ""
                )
              }
            >
              {filterData[0].category}{" "}
              <FaChevronDown size={14} className="mt-1" />
            </button>
            {openCategory === filterData[0].category && (
              <div className="p-3 pt-0 space-y-2 text-brand/70">
                {filterData[0].options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type={filterData[0].inputType}
                      id={`${filterData[0].category}-${option.value}`}
                      name={filterData[0].category}
                      value={option.value}
                      className="cursor-pointer w-4 h-4"
                    />
                    <label
                      htmlFor={`${filterData[0].category}-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Remaining elements from filterData */}
        {filterData.slice(1).map((item, parentIdx) => (
          <div key={parentIdx + 1} className="py-2 order-3">
            <button
              className="outline-0 w-full text-lg 2xl:text-xl font-semibold p-3 pt-0 text-brand flex justify-between items-center"
              onClick={() =>
                setOpenCategory((c) =>
                  c !== item.category ? item.category : ""
                )
              }
            >
              {item.category}
              <FaChevronDown size={14} className="mt-1" />
            </button>
            {openCategory === item.category && (
              <div className="p-3 pt-0 space-y-2 text-brand/70">
                {item.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type={item.inputType}
                      id={`${item.category}-${option.value}`}
                      name={item.category}
                      value={option.value}
                      className="cursor-pointer w-4 h-4 text-brand"
                    />
                    <label
                      htmlFor={`${item.category}-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeekerFilter;
