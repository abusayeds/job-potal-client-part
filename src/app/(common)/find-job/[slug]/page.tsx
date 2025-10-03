import React from "react";
import Container from "@/components/Container";
import RelatedJobs from "@/components/Jobs/RelatedJobs";
import JobDetails from "@/components/Jobs/JobDetails";
import { getJobDetails } from "@/services";
import { TPageProps } from "@/types";
import LoaderWraperComp from "@/components/LoaderWraperComp";

const page = async (props: TPageProps) => {
  const { slug } = await props.params;
  const jobDetailsData = await getJobDetails(slug);
  // console.log(jobDetailsData);
  return (
    <>
      <Container
        className="bg-lightgray hidden lg:block"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">Job Details</p>
        <p className="text-sm">
          <span className="text-brand/60">Home / Find Job </span>/ Job Details
        </p>
      </Container>
      <Container className="relative" mClassName="">
        <LoaderWraperComp
          isError={!jobDetailsData?.success}
          error={jobDetailsData}
          isLoading={false}
        >
          <JobDetails data={jobDetailsData?.data} />
        </LoaderWraperComp>
      </Container>
      <Container>
        <RelatedJobs jobId={slug} />
      </Container>
    </>
  );
};

export default page;
