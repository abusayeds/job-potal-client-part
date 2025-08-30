"use client";

import React, { useState } from "react";
import { TQuery, TUniObject } from "@/types";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { Popover, Table, TableColumnsType } from "antd";
import { useSearchParams } from "next/navigation";
import { useTrainingInterestedQuery } from "@/redux/features/training/training.api";
import SeekerOption from "@/components/seekers/SeekerOption";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TUser } from "@/redux/features/auth/authSlice";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("training") as string;
  const [query, setQuery] = useState<TQuery<{ jobType?: string }>>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError } = useTrainingInterestedQuery({
    id,
    args: Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() })),
  });

  const columns: TableColumnsType<TUniObject> = [
    // {
    //   title: "#SI.No",
    //   render: (_text, _data, index) => <p>{++index}</p>,
    // },
    {
      title: "Full Name",
      dataIndex: "fullName",
      render: (text: string) => <p className="whitespace-pre">{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "contactEmail",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Phone",
      dataIndex: "candidateInfo",
      render: (info) => <p>+{info.phone}</p>,
    },
    {
      title: "Action",
      render: (_text, record: TUniObject) => (
        <Popover
          className="absolute md:static top-4 right-3"
          content={<SeekerOption seeker={record as TUser} />}
          // title="Title"
          trigger="click"
          placement="bottomRight"
          //   onOpenChange={setOpenPopover}
          //   open={openPopover}
        >
          <button className="px-2.5 py-2 text-sm font-sans rounded-sm focus:outline-none cursor-pointer outline-0 hover:bg-blue-100 active:ring-blue-200">
            <PiDotsThreeOutlineVerticalFill size={16} />
          </button>
        </Popover>
      ),
      align: "center",
    },
  ];
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-medium">
          {data?.data?.trainingName ?? "N/A"}
        </h1>
        <h1 className="lg:text-xl font-medium">
          Interested
          <span className="text-brand/40 font-normal">
            {" "}
            ({data?.data?.pagination?.totalData ?? "N/A"})
          </span>
        </h1>
      </div>

      <LoaderWraperComp
        isError={isError}
        isLoading={false}
        dataEmpty={data?.data?.ragistrationList?.length < 1}
        className="h-[70vh]"
      >
        <div className="max-w-full overflow-x-auto">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data?.data?.ragistrationList.map(
              (item: TUniObject) => ({
                ...item.userId,
                // key: item._id,
              })
            )}
            rowKey="_id"
            pagination={{
              position: ["bottomCenter"],
              showQuickJumper: true,
              showSizeChanger: false,
              total: data?.data?.pagination?.totalData || 1,
              defaultCurrent: 1,
              current: query.page,
              onChange: (page) => setQuery((c) => ({ ...c, page })),
              pageSize: query.limit,
            }}
          />
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default Page;
