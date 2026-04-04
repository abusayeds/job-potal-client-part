"use client";

import { Button } from "antd";
import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { DashboardJobs } from "../Jobs/DashboardJobs";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { useDashboardJobsQuery } from "@/redux/features/jobs/jobs.api";
import { TRole } from "@/types";
import LoaderWraperComp from "../LoaderWraperComp";
import { TResError } from "@/lib/alerts";

const Recent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useDashboardJobsQuery([
    {
      name: "limit",
      value: "10",
    },
  ]);
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          Recently {user?.role === "candidate" ? "Applied" : "Posted Jobs"}
        </h1>
        <Link
          href={"/personal-jobs"}
          // href={user?.role === "candidate" ? "/applied-jobs" : "/personal-jobs"}
        >
          <Button type="text">
            <span className="text-sm sm:text-base">View all</span>
            <HiOutlineArrowRight size={18} />
          </Button>
        </Link>
      </div>
      <LoaderWraperComp
        error={error as TResError}
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.jobs?.length < 1}
        className="h-[50vh]"
      >
        <DashboardJobs data={data?.data?.jobs} viewType={user?.role as TRole} />
      </LoaderWraperComp>
    </div>
  );
};

export default Recent;
