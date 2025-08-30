"use client";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import SeekerCard from "@/components/seekers/SeekerCard";
import { TUser } from "@/redux/features/auth/authSlice";
import { useMyFavoriteQuery } from "@/redux/features/users/users.api";
import { TQuery } from "@/types";
import { Pagination } from "antd";
import React, { useState } from "react";

const Page = () => {
  const [query, setQuery] = useState<TQuery<{ jobType?: string }>>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError } = useMyFavoriteQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  // console.log(data?.data?.saveData)
  return (
    <div className="space-y-5">
      <h1 className="text-xl sm:text-2xl font-medium">
        Saved Cadidates ({data?.data?.pagination?.totalData || 0})
      </h1>
      <LoaderWraperComp
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.saveData?.length < 1}
        className="h-[70vh]"
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          {data?.data?.saveData?.map(
            (seeker: TUser & { candidateId: string }, index: number) => (
              <SeekerCard
                key={index}
                seeker={seeker}
                viewType="saved"
                className="rounded-xl hover:ring-1 ring-primary transition-all drop-shadow bg-white"
              />
            )
          )}
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
