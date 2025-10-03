import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import AuthOverview from "@/components/Auth/AuthOverview";
import SignIn from "@/components/Auth/SignIn";
import { appStatus } from "@/services";
import { TPageProps } from "@/types";

const page = async (props: TPageProps) => {
  const { redirect } = await props.searchParams;
  const appStatusData = await appStatus();
  return (
    <div className="relative ">
      <div className="min-h-screen h-full grid grid-cols-2 lg:sticky top-0 left-0">
        <div className="col-span-2 lg:col-span-1">
          <Container className="lg:hidden">
            <SignIn redirect={redirect as string} />
          </Container>
        </div>
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 w-full h-full lg:[clip-path:polygon(5%_0,100%_0,100%_100%,0%_100%)]">
          <div className="h-full relative bg-gradient-to-b from-[#041A3C]/60 to-[#041A3C]/95">
            <Image
              src="/images/bgs/login.jpg"
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
          <SignIn redirect={redirect as string} />
          <AuthOverview data={appStatusData} className="" />
        </Container>
      </div>
    </div>
  );
};

export default page;
