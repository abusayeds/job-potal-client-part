"use client";

import LoaderWraperComp from "@/components/LoaderWraperComp";
import PageHeading from "@/components/ui/PageHeading";
import { TResError } from "@/lib/alerts";
import { useGetAboutQuery } from "@/redux/features/settings/settings.api";
import { Button } from "antd";
import Link from "next/link";

const Page = () => {
  // const { data, isLoading, isError } = useGetSettingQuery([
  //   { name: "type", value: "terms" },
  // ]);

  const { data, isLoading, isError, error } = useGetAboutQuery({});
  console.log(data);
  return (
    <div className="">
      <PageHeading title={"About Us"} />
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
        {/* <div>All text for aobut us</div> */}
        <div className="flex justify-end pt-10">
          <Link href={"about-us/edit"} className="w-full max-w-[250px]">
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
