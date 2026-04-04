"use client";

import React, { useState } from "react";
import Container from "../Container";
import { PiSliders } from "react-icons/pi";
import { Button, Drawer } from "antd";
import { MdClose } from "react-icons/md";
import EmployersFilter from "./EmployersFilter";
import EmployerCard from "./EmployerCard";
import { TUniObject } from "@/types";
import LoaderWraperComp from "../LoaderWraperComp";
import { TUser } from "@/redux/features/auth/authSlice";
import PaginationComp from "../ui/PaginationComp";
import PageSize from "../ui/PageSize";

const FindEmployers = ({ data }: { data: TUniObject }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  // console.log(data)
  return (
    <>
      <Container>
        <div className="flex justify-between items-center">
          <div className="lg:hidden">
            <Button onClick={showDrawer} type="primary">
              <PiSliders size={15} /> Filter
            </Button>
          </div>
          <h3 className="text-xl xl:text-2xl hidden lg:block ">
            {/* Employee Filter */}
          </h3>
         <PageSize/>
        </div>
        <div className="grid grid-cols-9 mt-4 ">
          {/* <EmployersFilter className="col-span-2 hidden lg:block" /> */}
          <div className="col-span-9 w-full">
            <div className="grid grid-cols-1 gap-4 w-full sm:p-6 sm:pt-0">
              <LoaderWraperComp
                isLoading={false}
                isError={!data.success}
                error={data}
                dataEmpty={data?.data?.employers?.length === 0}
              >
                <div className="grid grid-cols-1 gap-4 w-full p-2 sm:p-6 sm:pt-0">
                  {data?.data?.employers?.map(
                    (employer: TUser) => (
                      <EmployerCard
                        key={employer._id}
                        employerData={employer}
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
        </div>
      </Container>
      <Drawer
        title={
          <div className="flex justify-between gap-1">
            <span>Filter Employer</span>{" "}
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
        <EmployersFilter className="font-roman" />
      </Drawer>
    </>
  );
};

export default FindEmployers;
