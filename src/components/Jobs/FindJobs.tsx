"use client";

import React, { useState } from "react";
import Container from "../Container";
import { PiSliders } from "react-icons/pi";
import { Button, Drawer } from "antd";
import JobFilter from "./JobFilter";
import JobCard from "./JobCard";
import { MdClose } from "react-icons/md";
import { TUniObject } from "@/types";
import PaginationComp from "../ui/PaginationComp";
import PageSize from "../ui/PageSize";
import LoaderWraperComp from "../LoaderWraperComp";
import { TJobDetails } from "@/types/jobs.type";

const FindJobs = ({ data }: { data: TUniObject }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // console.log(data);
  return (
    <>
      <Container>
        <div className="flex justify-between items-center">
          <div className="lg:hidden">
            <Button onClick={showDrawer} type="primary">
              <PiSliders size={15} /> Filter
            </Button>
          </div>
          <h3 className="text-xl xl:text-2xl hidden lg:block">
            All Job Filter
          </h3>
          <PageSize />
        </div>
        <div className="grid grid-cols-9 lg:grid-cols-11 mt-4 ">
          <JobFilter className="col-span-2 hidden lg:block" />
          <div className="col-span-9 w-full">
            <LoaderWraperComp
              isLoading={false}
              isError={!data.success}
              error={data}
              dataEmpty={data?.data?.allJobs?.length === 0}
            >
              <div className="grid grid-cols-1 gap-4 w-full sm:p-6 sm:pt-0">
                {data?.data?.allJobs?.map((job: TJobDetails) => (
                  <JobCard key={job._id} jobData={job} />
                ))}
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
            <span>Job Filters</span>{" "}
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
        <JobFilter className="font-roman" />
      </Drawer>
    </>
  );
};

export default FindJobs;
