"use client";

import React, { useState } from "react";
import SeekerCard from "@/components/seekers/SeekerCard";
import { TQuery, TUniObject } from "@/types";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { Pagination } from "antd";
import { useSearchParams } from "next/navigation";
import { useApplicantsQuery } from "@/redux/features/application/application.api";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("job") as string;
  const [query, setQuery] = useState<TQuery<{ jobType?: string }>>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError } = useApplicantsQuery({
    id,
    args: Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() })),
  });
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          {data?.data?.jobTitle ?? "N/A"}
          <span className="text-brand/40 font-normal lg:text-lg">
            {" "}
            ({data?.data?.jobType ?? "N/A"})
          </span>
        </h1>
        <h1 className="lg:text-xl font-medium">
          Application’s
          <span className="text-brand/40 font-normal">
            {" "}
            ({data?.data?.pagination?.totalData ?? "N/A"})
          </span>
        </h1>
      </div>

      <LoaderWraperComp
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.applications?.length < 1}
        className="h-[70vh]"
      >
        <div className="grid grid-cols-1 gap-4 w-full p-2 sm:p-6 sm:pt-0">
          {data?.data?.applications.map(
            ({ candidate, ...application }: TUniObject, index: number) => (
              <SeekerCard
                key={index}
                seeker={candidate}
                application={application}
                viewType="dashboard"
                className="rounded-xl hover:ring-1 ring-primary transition-all drop-shadow bg-white"
              />
            )
          )}
        </div>
      </LoaderWraperComp>
      {data?.data?.applications?.length > 1 && (
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
