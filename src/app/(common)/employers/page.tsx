import React from "react";
import Container from "@/components/Container";
import FindEmployers from "@/components/Employers/Employers";
import JobSearchBar from "@/components/Home/JobSearchBar";
import { TPageProps } from "@/types";
import { employerSearch } from "@/services";

const page = async (props: TPageProps) => {
  const params = await props.searchParams;
  const employerData = await employerSearch(params);
  return (
    <>
      <Container
        className="bg-lightgray"
        mClassName="py-3 lg:py-4 xl:py-5 space-y-3 lg:space-y-4"
      >
        <div className="flex justify-between items-center">
          <p className="sm:text-lg">Employers</p>
          <p className="text-sm">
            <span className="text-brand/60">Home</span> / Employers
          </p>
        </div>
        <JobSearchBar field2="address" path="/employers"/>
      </Container>
      <FindEmployers data={employerData} />
    </>
  );
};

export default page;
