"use client";

import Link from "next/link";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import PageHeading from "@/components/ui/PageHeading";
import { TResError } from "@/lib/alerts";
import { useGetDisclaimerQuery } from "@/redux/features/settings/settings.api";
import { Button } from "antd";

const Page = () => {
  // const { data, isLoading, isError } = useGetSettingQuery([
  //   { name: "type", value: "terms" },
  // ]);
  const { data, isLoading, isError, error } = useGetDisclaimerQuery({});
  // console.log(data);
  return (
    <div className="">
      <PageHeading title={"Disclaimer"} />
      {/* <LoaderWraperComp
            isLoading={isLoading}
            isError={isError}
            className={"h-[70vh]"}
          > */}
      <div className="p-4 min-h-[calc(100vh-200px)] flex flex-col justify-between">
        <LoaderWraperComp
          isLoading={isLoading}
          isError={isError}
          error={error as TResError}
          className={"h-[65vh]"}
        >
          <div
            className="prose prose-invert"
            dangerouslySetInnerHTML={{ __html: data?.data[0]?.description }}
          />
        </LoaderWraperComp>
        <div className="flex justify-end pt-10">
          <Link href={"disclaimer/edit"} className="w-full max-w-[250px]">
            <Button
              size="large"
              htmlType="submit"
              type="primary"
              className="w-full"
            >
              Edit
            </Button>
          </Link>
        </div>
      </div>
      {/* </LoaderWraperComp> */}
    </div>
  );
};

export default Page;
