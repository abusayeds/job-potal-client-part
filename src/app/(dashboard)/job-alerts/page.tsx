"use client";
import JobCard from "@/components/Jobs/JobCard";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { formatTwoDigits } from "@/lib/getTwoDisit";
import { useAlertJobsQuery } from "@/redux/features/jobs/jobs.api";
import { TQuery } from "@/types";
import { TJobDetails } from "@/types/jobs.type";
import { Pagination } from "antd";
import React, { useState } from "react";

const Page = () => {
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError } = useAlertJobsQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  console.log(data);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          Job Alerts{" "}
          <span className="text-brand/40 font-normal">
            ({formatTwoDigits(data?.data?.pagination?.totalData || 0)} new jobs)
          </span>
        </h1>
      </div>
      <LoaderWraperComp
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.data?.length < 1}
        className="h-[70vh]"
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          {data?.data?.data?.map((job: TJobDetails) => (
            <JobCard key={job._id} jobData={job} viewType="dashboard" />
          ))}
        </div>
      </LoaderWraperComp>
      {data?.data?.pagination?.totalData > 1 && (
        <div className="py-4">
          <Pagination
            // total={50}
            align="center"
            showQuickJumper={true}
            showSizeChanger={true}
            total={data?.data?.pagination?.totalData || 1}
            current={query.page}
            defaultCurrent={1}
            onChange={(page) => setQuery((c) => ({ ...c, page }))}
            pageSize={query.limit}
            onShowSizeChange={(_current, size) =>
              setQuery((c) => ({ ...c, limit: size }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default Page;
