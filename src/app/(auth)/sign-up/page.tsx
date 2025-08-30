import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import SignUp from "@/components/Auth/SignUp";
import AuthOverview from "@/components/Auth/AuthOverview";
import { TPageProps } from "@/types";
import { appStatus } from "@/services";

const page = async (props: TPageProps) => {
  const { type } = await props.searchParams;
  const appStatusData = await appStatus();
  return (
    <div className="relative ">
      <div className="min-h-screen h-full grid grid-cols-2 lg:sticky top-0 left-0">
        <div className="col-span-2 lg:col-span-1">
          <Container className="lg:hidden">
            <SignUp type={type as "candidate" | "employer"} />
          </Container>
        </div>
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 w-full h-full lg:[clip-path:polygon(5%_0,100%_0,100%_100%,0%_100%)]">
          <div className="h-full relative bg-gradient-to-b from-[#041A3C]/50 to-[#041A3C]/90">
            <Image
              src="/images/bgs/register.jpg"
              alt="bg"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                zIndex: -10,
              }}
            />
            <Container className="lg:hidden px-2">
              <AuthOverview data={appStatusData} className="min-h-[50vh]" />
            </Container>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Container
          className="fixed top-0 w-full"
          mClassName="h-full grid lg:grid-cols-2 gap-10 max-h-screen overflow-auto scrollbar-hide"
        >
          <SignUp type={type as "candidate" | "employer"} />
          <AuthOverview data={appStatusData} className="" />
        </Container>
      </div>
    </div>
  );
};

export default page;
