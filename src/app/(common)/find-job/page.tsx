import Container from "@/components/Container";
import JobSearchBar from "@/components/Home/JobSearchBar";
import FindJobs from "@/components/Jobs/FindJobs";
import { jobsSearch } from "@/services";
import { TPageProps } from "@/types";
import React from "react";

const page = async (props: TPageProps) => {
  const params = await props.searchParams;
  const jobData = await jobsSearch(params);
  return (
    <>
      <Container
        className="bg-lightgray"
        mClassName="py-3 lg:py-4 xl:py-5 space-y-3 lg:space-y-4"
      >
        <div className="flex justify-between items-center">
          <p className="sm:text-lg">Find Job</p>
          <p className="text-sm">
            <span className="text-brand/60">Home</span> / Find job
          </p>
        </div>
        <JobSearchBar field2="location" extendable />
      </Container>
      <FindJobs data={jobData} />
    </>
  );
};

export default page;
