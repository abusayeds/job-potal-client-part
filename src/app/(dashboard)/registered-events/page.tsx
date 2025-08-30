"use client";

import React, { useState } from "react";
import { TQuery, TRole, TUniObject } from "@/types";
import { useAppSelector } from "@/redux/hook";
import { Pagination } from "antd";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";
import { useMyAppliedTrainingQuery } from "@/redux/features/training/training.api";
import { DashboardTrainings } from "@/components/Training/DashboardTrainings";
// import { cookies } from "next/headers";

const Page = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [query, setQuery] = useState<TQuery<{ category?: string }>>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useMyAppliedTrainingQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  // const cookieStore = await cookies();
  // const role = cookieStore.get("token")?.value;
  // console.log({ data, isLoading, isError });
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          Registered Event's{" "}
          <span className="text-brand/40 font-normal">
            ({data?.data?.pagination?.totalData || "00"})
          </span>
        </h1>
      </div>
      <LoaderWraperComp
        error={error as TResError}
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.pagination?.totalData === 0}
        className="h-[70vh]"
      >
        <DashboardTrainings
          data={data?.data?.trainings?.map((item: TUniObject) => ({
            ...item.trainingId,
            regiDate: item.createdAt,
          }))}
          viewType={user?.role as TRole}
        />
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
