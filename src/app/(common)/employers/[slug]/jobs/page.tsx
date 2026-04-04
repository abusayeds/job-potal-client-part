import Container from "@/components/Container";
import FindJobs from "@/components/Jobs/FindJobs";
import { getCompanyJobs } from "@/services";
import { TPageProps } from "@/types";
import React from "react";

const page = async (props: TPageProps) => {
  const { slug } = await props.params;
  const jobDatas = await getCompanyJobs(slug);
  return (
    <>
      <Container
        className="bg-lightgray"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">Current Jobs</p>
        <p className="text-sm">
          <span className="text-brand/60">Home / Employer</span> / Current Jobs
        </p>
      </Container>
      <FindJobs data={jobDatas} />
    </>
  );
};

export default page;
