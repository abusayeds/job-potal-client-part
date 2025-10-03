import React from "react";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import Container from "@/components/Container";
import Image from "next/image";
import { TPageProps } from "@/types";

const page = async (props: TPageProps) => {
  const searchParams = await props.searchParams;
  const query = searchParams.query as string;
  const type = searchParams.type as string;
  return (
    <Container>
      <div className="relative w-full max-w-48 2xl:max-w-52 aspect-[4/1] mx-auto">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
        />
      </div>
      <VerifyEmail email={query} opType={type} />
    </Container>
  );
};

export default page;
