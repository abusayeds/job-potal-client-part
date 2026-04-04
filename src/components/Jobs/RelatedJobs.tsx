"use client";

import React from "react";
import SectionHeading from "../ui/SectionHeading";
import RelatedJobCard from "./RelatedJobCard";
import { useRelatedJobsQuery } from "@/redux/features/jobs/jobs.api";
import LoaderWraperComp from "../LoaderWraperComp";
import { TResError } from "@/lib/alerts";
import { TJobDetails } from "@/types/jobs.type";

const RelatedJobs = ({ jobId }: { jobId: string }) => {
  const { data, isLoading, isError, error } = useRelatedJobsQuery(jobId);
  return (
    <div>
      <SectionHeading title="Related Jobs" />
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        error={error as TResError}
      >
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-10">
          {data?.data?.slice(0, 6).map((job: TJobDetails) => (
            <RelatedJobCard data={job} key={job._id} />
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default RelatedJobs;
