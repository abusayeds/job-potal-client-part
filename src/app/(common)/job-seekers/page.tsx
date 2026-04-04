import React from "react";
import Container from "@/components/Container";
import JobSearchBar from "@/components/Home/JobSearchBar";
import FindSeekers from "@/components/seekers/FindSeekers";
import { TPageProps } from "@/types";
import { jobSeekerSearch } from "@/services";

const page = async (props: TPageProps) => {
  const params = await props.searchParams;
  const seekerData = await jobSeekerSearch(params);
  // console.log(seekerData)
  return (
    <>
      <Container
        className="bg-lightgray"
        mClassName="py-3 lg:py-4 xl:py-5 space-y-3 lg:space-y-4"
      >
        <div className="flex justify-between items-center">
          <p className="sm:text-lg">Find Job Seeker</p>
          <p className="text-sm">
            <span className="text-brand/60">Home</span> / Job Seekers
          </p>
        </div>
        <JobSearchBar field2="address" path="/job-seekers" />
      </Container>
      <FindSeekers data={seekerData} />
    </>
  );
};

export default page;
