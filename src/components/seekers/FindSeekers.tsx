"use client";

import React, { useState } from "react";
import Container from "../Container";
import { PiSliders } from "react-icons/pi";
import { Button, Drawer } from "antd";
import { MdClose } from "react-icons/md";
import SeekerFilter from "./SeekerFilter";
import SeekerCard from "./SeekerCard";
import { TUniObject } from "@/types";
import LoaderWraperComp from "../LoaderWraperComp";
import { TUser } from "@/redux/features/auth/authSlice";
import PaginationComp from "../ui/PaginationComp";
import PageSize from "../ui/PageSize";

const FindSeekers = ({ data }: { data: TUniObject }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container>
        <div className="flex justify-between items-center">
          <div className="lg:hidden">
            <Button onClick={showDrawer} type="primary">
              <PiSliders size={15} /> Filter
            </Button>
          </div>
          <h3 className="text-xl xl:text-2xl hidden lg:block">All Filter</h3>
          <PageSize />
        </div>
        <div className="grid grid-cols-9 lg:grid-cols-11 mt-4 ">
          {/* <SeekerFilter className="col-span-2 hidden lg:block" /> */}
          {/* <div className="col-span-9 w-full"> */}
          <div className="col-span-9 lg:col-span-11 w-full">
            <LoaderWraperComp
              isLoading={false}
              isError={!data.success}
              error={data}
              dataEmpty={data?.data?.seekers?.length === 0}
            >
              <div className="grid grid-cols-1 gap-4 w-full p-2 sm:p-6 sm:pt-0">
                {data?.data?.seekers?.map(
                  (
                    {
                      candidateInfo,
                      ...rest
                    }: TUniObject & { candidateInfo: TUser },
                    index: number
                  ) => (
                    <SeekerCard
                      key={index}
                      seeker={{ ...candidateInfo, ...rest }}
                      viewType="client"
                      className="rounded-xl border border-gray-200 hover:ring-1 ring-primary transition-all"
                    />
                  )
                )}
              </div>
            </LoaderWraperComp>
            <PaginationComp
              totalData={data?.data?.pagination?.totalData}
              showSizeChanger={false}
            />
          </div>
        </div>
      </Container>
      <Drawer
        title={
          <div className="flex justify-between gap-1">
            <span>Seeker Filters</span>{" "}
            <Button
              onClick={onClose}
              type="text"
              size="small"
              icon={<MdClose size={22} />}
              style={{ color: "red" }}
            />
          </div>
        }
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        size={"default"}
        width={320}
      >
        <SeekerFilter className="font-roman" />
      </Drawer>
    </>
  );
};

export default FindSeekers;
