"use client";

import LoaderWraperComp from "@/components/LoaderWraperComp";
import PricingCard from "@/components/Subscriptions/PricingCard";
import { useSubscriptionQuery } from "@/redux/features/subscription/subscription.api";
import { TSubscription } from "@/types/subscription.type";

const Page = () => {
  const { data, isLoading, isError } = useSubscriptionQuery(undefined);

  return (
    <div className="space-y-16">
      <div className=" text-center space-y-2">
        <h4 className="text-3xl xl:text-4xl font-roman-bold text-primary">
          Your Subscription Plan
        </h4>
        <p className="font-medium text-gray-500">Growth Your Bussiness.</p>
      </div>

      {/* <div className="flex justify-center gap-x-5 2xl:gap-x-7 gap-y-8 my-8">
        {pricingPlans.map((pricing) => (
          <PricingCard key={pricing.id} data={pricing} viewType={"admin"} />
        ))}
      </div> */}

      <LoaderWraperComp isLoading={isLoading} isError={isError}>
        <div className="flex justify-center gap-x-5 2xl:gap-x-7 gap-y-8 my-8">
          {data?.data?.length === 0 ? (
            <p> No subscription Found </p>
          ) : (
            data?.data.map((pricing: TSubscription) => (
              <PricingCard key={pricing._id} data={pricing} viewType="admin" />
            ))
          )}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default Page;
