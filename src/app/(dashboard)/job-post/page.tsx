import JobUploadForm from "@/components/Jobs/JobUploadForm";
import { TJobDetails } from "@/types/jobs.type";
import React from "react";

const page = () => {
  return (
    <div>
      <p className="text-xl sm:text-2xl text-center underline underline-offset-4 pt-2">
        {"Create new"} Job
      </p>
      <JobUploadForm type="create"/>
    </div>
  );
};

export default page;
