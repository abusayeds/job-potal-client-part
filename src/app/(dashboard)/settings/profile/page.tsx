"use client";

import React from "react";
import JobDetails from "@/components/Jobs/JobDetails";
import { useDashSingleJobsQuery } from "@/redux/features/jobs/jobs.api";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";
import { useAppSelector } from "@/redux/hook";

const Page = () => {
  // const { user } = useAppSelector((state) => state.auth);
  // const { data, isLoading, isError, error } = useDashSingleJobsQuery(
  //   user?._id,
  //   {
  //     skip: !user?._id,
  //   }
  // );
  // console.log(data)
  return (
    <div className="h-[50vh] flex justify-center items-center">
      Coming soon!
    </div>
  );
};

export default Page;
