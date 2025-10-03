"use client";

import { cn } from "@/utils/cn";
import Container from "@/components/Container";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";
import { compareByCTime } from "@/redux/features/category/compareByCTime";
import { useAllNotificationQuery } from "@/redux/features/notification/notification.api";
import { TQuery, TUniObject } from "@/types";
import { Pagination } from "antd";
import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Page = () => {
  const [query, setQuery] = useState<TQuery>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useAllNotificationQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  return (
    <>
      <Container
        className="bg-lightgray hidden lg:block"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">All Notification</p>
        <p className="text-sm">
          <span className="text-brand/60">Home </span> / Notifications
        </p>
      </Container>
      <Container mClassName="py-2 lg:py-3 xl:py-3 space-y-3 lg:space-y-4">
        <LoaderWraperComp
          isError={isError}
          isLoading={isLoading}
          dataEmpty={data?.data?.notifications?.length < 1}
          error={error as TResError}
          className="h-[80vh]"
        >
          <div className="min-h-[65vh] ">
            {data?.data?.notifications?.map((item: TUniObject) => (
              <div
                key={item._id}
                className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 hover:bg-gray-100 transition-all relative"
              >
                <IoIosNotificationsOutline
                  style={{ cursor: "pointer" }}
                  className={`border border-white w-[42px] h-[42px] text-primary rounded-lg p-1.5 shadow-xs text-info group-hover:bg-[#b3dfc7]`}
                />
                <div className="space-y-[2px]">
                  <h6 className="text-lg">{item.notification}</h6>
                  <small className="text-[12px] text-gray-500">
                    {compareByCTime(item.createdAt)}
                  </small>
                </div>
                <div
                  className={cn(
                    "absolute right-3 inset-y-0 w-fit flex items-center",
                    {
                      hidden: !!item?.isRead,
                    }
                  )}
                >
                  <div className="text-[9px] font-semibold bg-yellow-400 px-2 h-[16px] rounded-full flex items-center justify-center pt-0.5">
                    New
                  </div>
                </div>
              </div>
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
      </Container>
    </>
  );
};

export default Page;
