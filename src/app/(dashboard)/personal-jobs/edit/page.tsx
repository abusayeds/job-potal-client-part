"use client";

import React from "react";
import JobUploadForm from "@/components/Jobs/JobUploadForm";
import { useSearchParams } from "next/navigation";
import { useDashSingleJobsQuery } from "@/redux/features/jobs/jobs.api";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TResError } from "@/lib/alerts";
import { TJobDetails } from "@/types/jobs.type";

const Page = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { data, isLoading, isError, error } = useDashSingleJobsQuery(slug, {
    skip: !slug,
  });
  const { companyId, ...jobData } = data?.data ?? {};

  return (
    <div>
      <p className="text-xl sm:text-2xl text-center underline underline-offset-4 pt-2">
        {"Edit this"} Job
      </p>
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        error={error as TResError}
        className="h-[80vh]"
      >
        <JobUploadForm type="edit" previous={jobData} />
      </LoaderWraperComp>
    </div>
  );
};

export default Page;
