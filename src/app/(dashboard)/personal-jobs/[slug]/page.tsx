"use client";

import React, { use } from "react";
import JobDetails from "@/components/Jobs/JobDetails";
import { useDashSingleJobsQuery } from "@/redux/features/jobs/jobs.api";
import { TPageProps } from "@/types";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";

const Page = (props: TPageProps) => {
  const { slug } = use(props.params);
  const { data, isLoading, isError, error } = useDashSingleJobsQuery(slug, {
    skip: !slug,
  });
  return (
    <LoaderWraperComp
      isLoading={isLoading}
      isError={isError}
      error={error as TResError}
    >
      <JobDetails viewType="dashboard" data={data?.data} />
    </LoaderWraperComp>
  );
};

export default Page;
