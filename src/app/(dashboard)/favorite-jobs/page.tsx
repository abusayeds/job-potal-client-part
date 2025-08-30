"use client";

import React, { useState } from "react";
import JobCard from "@/components/Jobs/JobCard";
import { TQuery, TUniObject } from "@/types";
import { useMyFavoriteQuery } from "@/redux/features/users/users.api";
import { Pagination } from "antd";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";

// const { data: favoriteData } = useMyFavoriteQuery(undefined);
// console.log(favoriteData?.data?.saveData)
const Page = () => {
  const [query, setQuery] = useState<TQuery<{ jobType?: string }>>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useMyFavoriteQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  // console.log(data);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          Favorite Jobs
          <span className="text-brand/40 font-normal">
          {' '}  ({data?.data?.pagination?.totalData || 0})
          </span>
        </h1>
      </div>
      <LoaderWraperComp
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.saveData?.length < 1}
        error={error as TResError}
        className="h-[70vh]"
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          {data?.data?.saveData.map((job: TUniObject, index: number) => (
            <JobCard
              key={index}
              jobData={job.jobId}
              viewType="dashboard"
              isFavorite={true}
            />
          ))}
        </div>
      </LoaderWraperComp>
      {data?.data?.saveData?.length > 1 && (
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
