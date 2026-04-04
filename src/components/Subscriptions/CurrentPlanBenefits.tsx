import { planFeatures } from "@/constants/features.const";
import { TUniObject } from "@/types";
import { TSubscription } from "@/types/subscription.type";
import { cn } from "@/utils/cn";
import React, { createElement } from "react";
import { BiCheckDouble } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";

const CurrentPlanBenefits = ({
  className,
  data,
}: {
  className?: string;
  data: TUniObject;
}) => {
  return (
    <div
      className={cn(
        "p-6 border border-gray-200 rounded-lg space-y-5",
        className
      )}
    >
      <p className="text-2xl font-medium">Plan Benefits</p>
      <p className="text-brand/70">
        The gateway itself is made for smooth completion. But it requires proper
        planning.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pb-1.5">
        {planFeatures.map((feature, index) => (
          <div key={index} className="flex gap-2">
            {createElement(
              data?.[feature.name as keyof TSubscription] === true
                ? BiCheckDouble
                : RiCloseCircleLine,
              {
                className: `w-4.5 h-4.5 shrink-0 
                ${
                  data?.[feature.name as keyof TSubscription] === true
                    ? "text-primary mt-1"
                    : "text-red-500 mt-0.5"
                }
                `,
              }
            )}
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-300 pt-6 space-y-3">
        <p className="text-sm text-brand/65">REMAINING JOB</p>
        <div className="grid grid-cols-2 ">
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              size={18}
              className="text-green-500 mt-0.5"
            />
            <p>
              {data?.remaining ?? "N/A"}
              {!!data?.jobpost &&
                data?.jobpost !== "unlimited" &&
                `/` + data?.jobpost}
            </p>
          </div>
          <div className="flex gap-2">
            <IoMdCheckmarkCircleOutline
              size={18}
              className="text-green-500 mt-0.5"
            />
            <p>
              Valid till date :{" "}
              {data?.expiryDateTimestamp
                ? new Date(data?.expiryDateTimestamp).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanBenefits;
