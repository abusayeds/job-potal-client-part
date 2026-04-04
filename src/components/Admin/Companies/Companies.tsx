// import { jobDatas } from "@/constants/testdata";
import { TJobDatas, TPagination, TQuery } from "@/types";
import { useState } from "react";
import CompanyCard from "./CompanyCard";

const Companies = ({
  viewType,
  jobDatas,
}: {
  viewType: "requested" | "verified";
  jobDatas: TJobDatas;
}) => {

  return (
    <>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 lg:gap-6">
        {jobDatas?.map((company) => (
          <CompanyCard
            key={company._id}
            data={{ ...company, status: viewType }}
          />
        ))}
      </div>
    </>
  );
};

export default Companies;
