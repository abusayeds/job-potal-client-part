"use client";
import { trainingFilter } from "@/constants/filter.const";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";
import { PiFolderOpenThin, PiSubtitlesLight } from "react-icons/pi";

type FormValues = {
  [key: string]: FormDataEntryValue | undefined;
};

const TrainingSearch = ({
  className,
  path,
}: {
  className?: string;
  path?: string;
}) => {
  const router = useRouter();
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formValues: FormValues = Object.fromEntries(formData.entries());
      const newParams = Object.entries({
        ...formValues,
      }).filter((item) => item[1] !== undefined && item[1]) as [
        string,
        string
      ][];
      const queryString = new URLSearchParams(newParams).toString();
      router.push(`${path}${queryString ? `?${queryString}` : ""}`);
    },
    [router]
  );

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        " bg-gray-50 drop-shadow-xs p-8 grid grid-cols-2 items-center gap-4",
        className
      )}
    >
      <h1 className="col-span-2 text-center text-xl md:text-2xl pb-2 leading-tight">
        Building Skills for Success
      </h1>
      <div className="col-span-2 md:col-span-1 bg-white flex items-center px-2 sm:px-3 flex-1 border border-gray-200">
        <PiFolderOpenThin className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <select
          name="category"
          //   defaultValue={searchParams.get("searchTerm") || ""}
          className="w-full outline-none text-gray-700 py-2 lg:py-3 px-2 sm:px-3 ml-2 sm:ml-3 border-l border-gray-200 "
        >
          <option value={undefined} selected disabled>
            Category
          </option>
          {trainingFilter[0].options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2 md:col-span-1 bg-white flex items-center pl-2 sm:pl-3  flex-1 border border-gray-200">
        <GoOrganization className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <input
          type="text"
          name="companyName"
          //   defaultValue={searchParams.get("searchTerm") || ""}
          placeholder="Company..."
          className="w-full outline-none text-gray-700 py-2 lg:py-3 px-2 sm:px-3 ml-2 sm:ml-3 border-l border-gray-200 placeholder:text-gray-700 "
        />
      </div>
      <div className="col-span-2 md:col-span-1 bg-white flex items-center pl-2 sm:pl-3  flex-1 border border-gray-200">
        <CiCalendarDate className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <input
          type="date"
          name="date"
          //   defaultValue={searchParams.get("searchTerm") || ""}
          placeholder="Title..."
          className="w-full outline-none text-gray-700 py-2 lg:py-3 px-2 sm:px-3 ml-2 sm:ml-3 border-l border-gray-200"
        />
      </div>
      <div className="col-span-2 md:col-span-1 bg-white flex items-center pl-2 sm:pl-3  flex-1 border border-gray-200">
        <PiSubtitlesLight className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <input
          type="text"
          name="searchTerm"
          //   defaultValue={searchParams.get("searchTerm") || ""}
          placeholder="Title..."
          className="w-full outline-none text-gray-700 py-2 lg:py-3 px-2 sm:px-3 ml-2 sm:ml-3 border-l border-gray-200  placeholder:text-gray-700"
        />
      </div>

      {/* Search Button */}
      <div className="col-span-2 flex justify-end">
        <button
          // onClick={() => router.push(`/find-job`)}
          className="md:w-full max-w-xs border border-slate-300 md:hover:border-blue-500 hover:text-blue-600 text-slate-500 font-medium px-10 py-2 shadow hover:shadow-md active:shadow-lg rounded transition-colors duration-200 outline-none cursor-pointer"
        >
          {/* <IoIosSearch size={20} className="" />{" "} */}
          <span className="">Search</span>
        </button>
      </div>
    </form>
  );
};

export default TrainingSearch;
