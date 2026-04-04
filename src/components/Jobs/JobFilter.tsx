"use client";

import { filterData } from "@/constants/filter.const";
import { cn } from "@/utils/cn";
import { Button, Slider } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const JobFilter = ({ className }: { className?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openCategory, setOpenCategory] = useState("");
  const [rangeValue, setRangeValue] = useState<number[]>([
    Number(searchParams.get("minSalary")) || 0,
    Number(searchParams.get("maxSalary")) || 100000,
  ]);
  // const
  //   const onChange = (value: number | number[]) => {
  //     console.log("onChange: ", value);
  //   };
  const onChangeComplete = async (value: number | number[]) => {
    setRangeValue(value as number[]);
    const params = new URLSearchParams(searchParams.toString());
    ["minSalary", "maxSalary"].forEach((key, index) => {
      params.delete(key);
      params.append(key, (value as number[])[index].toString());
    });
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  const handleSearchParamsInclude = (
    key: string,
    value: string,
    inputType?: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (inputType === "checkbox") {
      const existing = searchParams.get(key)?.split(",") || [];
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      if (updated.length < 1) {
        params.delete(key);
      } else {
        params.set(key, updated.join(",").trim());
      }
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  const handleResetFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className={cn("", className)}>
      <div className="lg:border-r border-gray-300 flex flex-col divide-y divide-gray-300 w-full">
        {/* First element from filterData */}
        <div className="pb-1 pt-2 order-1">
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
                    onClick={() =>
                      handleSearchParamsInclude(
                        filterData[0].name,
                        option.value,
                        filterData[0].inputType
                      )
                    }
                    defaultChecked={searchParams
                      .get(filterData[0].name)
                      ?.includes(option.value)}
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

        {/* Salary div - now second element */}
        <div className="py-2 order-2">
          <h4 className="text-lg 2xl:text-xl font-semibold p-3 text-brand">
            {"Salary"}
          </h4>
          <div className="p-3 pt-0 text-brand/70">
            <Slider
              range
              step={1}
              defaultValue={rangeValue}
              //   onChange={onChange}
              max={100000}
              onChangeComplete={onChangeComplete}
              tooltip={{
                formatter: (value) => `${value}`,
                // formatter: (value) => `${value}K`,
              }}
            />
            <div className="flex items-center gap-1 pt-1">
              Range : {rangeValue[0]} - {rangeValue[1]}
            </div>
          </div>
        </div>

        {/* Remaining elements from filterData */}
        {filterData.slice(1).map((item, parentIdx) => (
          <div key={parentIdx + 1} className="pt-2 pb-1 order-3">
            <button
              className="outline-0 w-full text-lg 2xl:text-xl font-semibold p-3 pt-1 text-brand flex justify-between items-center"
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
                  <div key={idx} className="flex gap-2">
                    <input
                      onClick={() =>
                        handleSearchParamsInclude(
                          item.name,
                          option.value,
                          item.inputType
                        )
                      }
                      defaultChecked={searchParams
                        .get(item.name)
                        ?.includes(option.value)}
                      type={item.inputType}
                      id={`${item.category}-${option.value}`}
                      name={item.category}
                      value={option.value}
                      className="cursor-pointer w-4 h-4 mt-1 shrink-0 text-brand"
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
      <div className="flex justify-center items-center pt-3">
        <Button onClick={handleResetFilters} color="default" variant="dashed" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default JobFilter;
