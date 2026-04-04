import React, { createElement } from "react";
import { TJobDetails } from "@/types/jobs.type";
import Image from "next/image";
import Link from "next/link";
import { TfiLocationPin } from "react-icons/tfi";
import { imageUrl } from "@/config";
import { currencyIcon } from "@/constants";
import { GoCheck } from "react-icons/go";
import { CgClose } from "react-icons/cg";

const RelatedJobCard = ({ data }: { data: TJobDetails }) => {
  const isExpired = (expire: string) => {
    const expireValue = new Date(expire);
    return expireValue < new Date();
  };
  return (
    <Link
      href={`/find-job/${data._id}`}
      className="drop-shadow-xs hover:drop-shadow-lg transition-shadow duration-300"
    >
      <div className="bg-white border border-gray-200 rounded-lg p-4 xl:p-6 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-md overflow-hidden drop-shadow-xs flex-shrink-0 border border-gray-100">
            <Image
              src={imageUrl + data.logo}
              alt="logo"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg text-brand font-medium mb-1 line-clamp-1">
              {data.jobTitle}{" "}
              <span className="text-gray-500 text-xs">({data.jobType})</span>
            </h3>
            <div className="flex items-center text-gray-500 text-xs">
              <TfiLocationPin className="w-3 h-3 mr-1" />
              <span className="line-clamp-1">{data.location ?? "N/A"}</span>
            </div>
          </div>
        </div>
        <h2 className="text-brand font-medium text-lg mb-2 line-clamp-1">
          {data.companyId?.companyName ?? "N/A"}
        </h2>
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <span>
            {createElement(
              !isExpired(data.expirationDate) ? GoCheck : CgClose,
              {
                className: `h-3 w-3 border rounded-full shrink-0 inline-block mb-1 mr-0.5 ${
                  !isExpired(data.expirationDate)
                    ? "text-green-500 border-green-500"
                    : "text-red-500 border-red-500"
                }`,
              }
            )}{" "}
            {new Date(data.expirationDate).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <div className="size-2 bg-brand/40 rounded-full" />
          <span>
            {currencyIcon[data.currency]}
            {data.minSalary}-{data.maxSalary} ({data.salaryType})
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RelatedJobCard;
