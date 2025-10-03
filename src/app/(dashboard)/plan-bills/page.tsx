"use client";

import React, { useEffect } from "react";
import ChangePlan from "@/components/Subscriptions/ChangePlan";
import CurrentPlanBenefits from "@/components/Subscriptions/CurrentPlanBenefits";
import LatestInvoices from "@/components/Subscriptions/LatestInvoices";
import NextInvoice from "@/components/Subscriptions/NextInvoice";
import { useMyPlanQuery } from "@/redux/features/subscription/subscription.api";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import Swal from "sweetalert2";
import LoaderWraperComp from "@/components/LoaderWraperComp";

const Page = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isError } = useMyPlanQuery(undefined);
  const router = useRouter();
  // console.log({ data, isLoading, isError });
  useEffect(() => {
    const currentDate = new Date();
    const isExpired =
      !!user &&
      user?.purchasePlan?.expiryDateTimestamp &&
      user?.purchasePlan?.expiryDateTimestamp < currentDate;
    if (!!user && !user?.purchasePlan?.subscriptionId) {
      router.push("/plan-bills/subscriptions");
    } else if (isExpired) {
      Swal.fire({
        icon: "error",
        title: "Subscription Expired!",
        html: `
              <div class="text-center">
                 Your current subscription is no longer valid. To continue, please select and purchase a new plan.
              </div>
            `,
        // text: `Are you sure you want to ${object || "logout"}?`,
        showCancelButton: true,
        confirmButtonText: "Buy Plan",
        cancelButtonText: "Ok",
        showConfirmButton: true,
        // confirmButtonColor: conBtnColor || "red",
        reverseButtons: true,
        customClass: {
          confirmButton: "text-white font-bold py-2 px-4 rounded-full w-40",
          cancelButton: "font-bold py-2 px-4 rounded-full w-40",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          router.push("/plan-bills/subscriptions");
        }
      });
    }
  }, [user]);
  return (
    <div className="space-y-7">
      <LoaderWraperComp isLoading={false} isError={isError}>
        <div className="grid grid-cols-11 gap-5 drop-shadow-xs">
          <div className="col-span-11 xl:col-span-5 space-y-5 h-full flex flex-col">
            <ChangePlan data={data?.data?.myPlan} className="h-fit bg-white" />
            <NextInvoice
              data={data?.data?.nextInvoice}
              className="h-full bg-white"
            />
          </div>
          <CurrentPlanBenefits
            data={{ ...data?.data?.myPlan, remaining: data?.data?.remaining }}
            className="col-span-11 xl:col-span-6 bg-white"
          />
        </div>
      </LoaderWraperComp>
      <LatestInvoices />
    </div>
  );
};

export default Page;
