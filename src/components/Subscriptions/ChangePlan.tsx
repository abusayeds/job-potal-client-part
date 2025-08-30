import { getPlanLabel } from "@/lib/getPlanLabel";
import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import { Button} from "antd";
import Link from "next/link";
import React, { createElement } from "react";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";

const ChangePlan = ({
  className,
  data,
}: {
  className?: string;
  data: TUniObject;
}) => {
  // console.log(data);
  return (
    <div
      className={cn(
        "p-6 border border-gray-200 rounded-lg space-y-5",
        className
      )}
    >
      <p className="font-medium text-sm">Current Plan</p>
      <h5 className="text-3xl font-roman-bold">
        {getPlanLabel(data?.planName)}
      </h5>
      <div className="space-y-2">
        <p>
          Started date :{" "}
          {data?.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "N/A"}
        </p>
        <p className="text-brand/70">
          This plan offers full access to premium features designed to support
          your hiring goals. Enjoy flexibility, enhanced visibility, and
          all-inclusive job posting tools to maximize your recruitment success.
        </p>
        {data?.planName === "unlimited_plan" && (
          <div className="pt-2 pb-1 flex items-center gap-1.5">
            {createElement(
              data?.autoRenewal ? IoMdRadioButtonOn : IoMdRadioButtonOff,
              { size: 22, className: "text-blue-500" }
            )}
            Auto Renewable
          </div>
        )}
      </div>
      <Link href={"/plan-bills/subscriptions"}>
        <Button
          type="text"
          className="w-full"
          size="large"
          style={{ background: "#f1f2f4" }}
        >
          Change Plan
        </Button>
      </Link>
    </div>
  );
};

export default ChangePlan;
