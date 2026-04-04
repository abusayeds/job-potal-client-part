import { errorAlert, TResError } from "@/lib/alerts";
import { useRenewableMutation } from "@/redux/features/subscription/subscription.api";
import { useAppSelector } from "@/redux/hook";
import { TUniObject } from "@/types";
import { cn } from "@/utils/cn";
import { Button, message } from "antd";
import React from "react";

const NextInvoice = ({
  className,
  data,
}: {
  className?: string;
  data: TUniObject;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  // const [mutation, { isLoading: checkoutLoading }] = useChackoutMutation();
  const [renewableMutation, { isLoading }] = useRenewableMutation();
  const handleRenewable = async () => {
    try {
      const res = await renewableMutation({
        body: { autoRenewal: !user?.purchasePlan?.autoRenewal },
        myPlanId: user?.purchasePlan?.subscriptionId,
      }).unwrap();
      messageApi.open({
        key: "renewable",
        type: "success",
        content: res?.message || "Your action is Successful!",
        duration: 3,
      });
    } catch (error) {
      errorAlert({ error: error as TResError });
    }
  };
  // const handlePurchasePlan = async () => {
  //   try {
  //     const clientBase = window.location.origin;
  //     const response = await mutation({
  //       body: {
  //         success_url: clientBase + "/payment-success",
  //         cancel_url: clientBase + "/payment-canceled",
  //       },
  //       planId: data?._id,
  //     }).unwrap();
  //     messageApi.open({
  //       key: "purchase",
  //       type: "success",
  //       content: "Redirecting to payment gateway, please wait...",
  //       duration: 2,
  //     });
  //     window.location.href = response.data.url;
  //   } catch (error) {
  //     errorAlert({ error: error as TResError });
  //   }
  // };

  return (
    <div
      className={cn(
        "p-6 border border-gray-200 rounded-lg space-y-5",
        className
      )}
    >
      {contextHolder}
      <p className="font-medium text-sm">Next Inovices</p>
      <div className="space-y-2">
        <h5 className="text-3xl text-primary">
          $ {data?.planPrice?.toFixed(2) ?? "00.0"} USD
        </h5>
        <p>
          Package Begins On :{" "}
          {data?.nextStartDate
            ? new Date(data?.nextStartDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "N/A"}
        </p>
        <p className="text-brand/60">
          You’ll be billed this amount according to your plan.{" "}
          {data?.planName !== "unlimited_plan" &&
            "To continue enjoying uninterrupted access to all features and services, we kindly request you to purchase a new plan."}
        </p>
      </div>
      {data?.planName !== "unlimited_plan" ? // </Button> //   Pay Now <BsArrowRight size={20} className="mt-1" /> // > //   className="w-full" //   type="primary" //   size="large" //   loading={checkoutLoading} //   onClick={handlePurchasePlan} // <Button
      null : (
        <Button
          onClick={handleRenewable}
          size="large"
          type="primary"
          className="w-full"
          loading={isLoading}
        >
          {data?.autoRenewal ? "Auto Renewal Disable" : "Auto Renewal Enable"}
        </Button>
      )}
    </div>
  );
};

export default NextInvoice;
