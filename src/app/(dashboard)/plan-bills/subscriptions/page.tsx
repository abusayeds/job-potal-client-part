"use client";

import React from "react";
import PricingCard from "@/components/Subscriptions/PricingCard";
import Image from "next/image";
import { useSubscriptionQuery } from "@/redux/features/subscription/subscription.api";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { TSubscription } from "@/types/subscription.type";
import { isProduction } from "@/config";

const Page = () => {
  const { data, isLoading, isError } = useSubscriptionQuery(undefined);
  // console.log(data, isLoading, isError);
  return (
    <div>
      <div className="flex justify-between gap-8">
        <div className="space-y-2 max-w-xl text-center md:text-start px-4 md:px-0">
          <h3 className="text-2xl lg:text-3xl">
            Buy Premium Subscription to Post a Job
          </h3>
          <p className="text-brand/70">
            Basic Plan for limited job postings, the Standard Plan for up to 5
            job posts annually, and the Unlimited Plan for organizations needing
            unlimited postings. Each plan includes customizable ads, multiple
            category selections, and the option to add logos and images, helping
            employers choose the best fit for their hiring needs.
          </p>
        </div>
        <div className="hidden md:block max-h-40">
          <Image
            src={"/statics/subscriptions.svg"}
            alt="hero"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
      </div>
      <LoaderWraperComp isLoading={isLoading} isError={isError}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-8 my-8">
          {data?.data.map((pricing: TSubscription) => (
            <PricingCard key={pricing._id} data={pricing} viewType="employer" />
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default Page;
