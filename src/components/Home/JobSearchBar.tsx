"use client";
import { cn } from "@/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

type FormValues = {
  [key: string]: FormDataEntryValue | undefined;
};

const JobSearchBar = ({
  className,
  field2,
  path = "/find-job",
  extendable,
}: {
  className?: string;
  field2: "location" | "address";
  path?: string;
  extendable?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      if (extendable) {
        const params = new URLSearchParams(searchParams.toString());
        for (const key in formValues) {
          if (Object.prototype.hasOwnProperty.call(formValues, key)) {
            const element = formValues[key];
            params.set(key, element as string);
            if (!element) params.delete(key);
          }
        }
        params.set("page", "1");
        router.push(`?${params.toString()}`);
      } else {
        const queryString = new URLSearchParams(newParams).toString();
        router.push(`${path}${queryString ? `?${queryString}` : ""}`);
      }
    },
    [router]
  );
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        " bg-white rounded-md shadow-lg p-2 flex items-center",
        className
      )}
    >
      {/* Keyword Search Field */}
      <div className="flex items-center flex-1 border-r border-gray-200 px-2 sm:px-3">
        <BiSearch className="text-blue-500 w-5 h-5 mr-1.5 md:mr-3 flex-shrink-0" />
        <input
          type="text"
          name="searchTerm"
          defaultValue={searchParams.get("searchTerm") || ""}
          placeholder="Job title, Keyword..."
          className="w-full outline-none text-gray-700 py-2 lg:py-3"
          // value={keyword}
          // onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Location Search Field */}
      <div className="flex items-center flex-1 px-2 sm:px-3">
        <IoLocationOutline className="text-blue-500 w-5 h-5 mr-1.5 md:mr-3  flex-shrink-0" />
        <input
          type="text"
          name={field2}
          defaultValue={searchParams.get(field2) || ""}
          placeholder="City, State"
          className="w-full outline-none text-gray-700 py-2 lg:py-3"
          // value={location}
          // onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <div className="md:mt-0 md:ml-2 md:mr-2">
        <button
          // onClick={() => router.push(`/find-job`)}
          className="bg-gray-100 md:bg-blue-500 md:hover:bg-blue-600 text-white font-medium px-2 md:px-6 py-2 rounded-full md:rounded-md w-full md:w-auto transition-colors duration-200 outline-none cursore-poi"
        >
          <IoIosSearch size={20} className="md:hidden text-blue-500" />{" "}
          <span className="hidden md:inline">Search</span>
        </button>
      </div>
    </form>
  );
};

export default JobSearchBar;
