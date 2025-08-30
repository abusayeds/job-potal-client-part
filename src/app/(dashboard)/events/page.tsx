"use client";

import React, { useState } from "react";
import { TQuery, TRole } from "@/types";
import { useAppSelector } from "@/redux/hook";
import { Button, Input, Pagination, Select } from "antd";
import { trainingFilter } from "@/constants/filter.const";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { debounceSearch } from "@/utils/debounce";
import { IoSearchOutline } from "react-icons/io5";
import { TResError } from "@/lib/alerts";
import { useMyTrainingQuery } from "@/redux/features/training/training.api";
import { DashboardTrainings } from "@/components/Training/DashboardTrainings";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
// import { cookies } from "next/headers";

const Page = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [query, setQuery] = useState<TQuery<{ category?: string }>>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useMyTrainingQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  // const cookieStore = await cookies();
  // const role = cookieStore.get("token")?.value;
  // console.log({ data, isLoading, isError });
  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Link href={"/events/add-new"}>
        <Button type="primary" icon={<FiPlus />}>
          Add Event
        </Button>
      </Link>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          Events{" "}
          <span className="text-brand/40 font-normal">
            ({data?.data?.pagination?.totalData || "00"})
          </span>
        </h1>
        {user?.role !== "candidate" && (
          <div className="flex justify-end items-center gap-2">
            <div className="flex justify-end items-center gap-2">
              <span className="whitespace-pre">Category :</span>
              <Select
                onChange={(value) =>
                  setQuery((c) => ({ ...c, category: value }))
                }
                // defaultValue={"All"}
                style={{ minWidth: "200px" }}
                placeholder="Category"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={trainingFilter[0].options}
                allowClear
              />
            </div>
            <Input
              onChange={(e) =>
                debounceSearch({
                  setter: setQuery,
                  newValue: e.target.value,
                  name: "searchTerm",
                })
              }
              allowClear
              placeholder="Search here.."
              suffix={
                <div className="pl-1.5 border-l border-gray-300">
                  <IoSearchOutline size={18} />
                </div>
              }
              style={{
                // height: 36,
                // borderRadius: 20,
                // width: "100%",
                maxWidth: 220,
              }}
            />
          </div>
        )}
      </div>
      <LoaderWraperComp
        error={error as TResError}
        isError={isError}
        isLoading={isLoading}
        dataEmpty={data?.data?.pagination?.totalData === 0}
        className="h-[70vh]"
      >
        <DashboardTrainings
          data={data?.data?.trainings}
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
