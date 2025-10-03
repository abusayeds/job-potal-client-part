import React from "react";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { getSitePolicies } from "@/services/settings";

const page = async () => {
  const appData = await getSitePolicies("terms");
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900 mb-5 pb-4 uppercase">
        Terms of use
      </h1>
      <LoaderWraperComp
        isLoading={false}
        isError={!appData.success}
        error={appData}
        className="h-[70vh]"
      >
        {appData?.data?.[0].description ? (
          <div
            className="no-tailwind"
            dangerouslySetInnerHTML={{
              __html: appData?.data?.[0].description,
            }}
          ></div>
        ) : (
          <p>N/A</p>
        )}
      </LoaderWraperComp>
    </div>
  );
};

export default page;
