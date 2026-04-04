"use client";

import Companies from "@/components/Admin/Companies/Companies";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";
import { useGetAllRequestedCompanyQuery } from "@/redux/features/company/company.api";
import { TQuery } from "@/types";
import { Pagination } from "antd";
import { useState } from "react";

const Page = () => {
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 10,
  });
  const queryParams = Object.entries(query)
    .filter((value) => value[1])
    .map(([name, value]) => ({ name, value: value.toString() }));
  const { data, isLoading, isError, error } =
    useGetAllRequestedCompanyQuery(queryParams);

  const jobDatas = data?.data?.employer || [];
  // console.log(jobDatas);

  return (
    <div className="space-y-5">
      <h4 className="text-xl xl:text-2xl font-medium text-white bg-secondery px-6 py-3 rounded-t-lg">
        Employer Account Management
      </h4>
      <LoaderWraperComp
        isError={isError}
        isLoading={isLoading}
        error={error as TResError}
        className="h-[70vh]"
      >
        {jobDatas?.length === 0 ? (
          <div className="h-full min-h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-center">No Requested account!</p>
          </div>
        ) : (
          <Companies
            jobDatas={jobDatas}
            viewType="requested"
          />
        )}
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
