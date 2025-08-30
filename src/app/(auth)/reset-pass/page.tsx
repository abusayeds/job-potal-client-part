import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import ResetPass from "@/components/Auth/ResetPass";

const page = () => {
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
      <ResetPass />
    </Container>
  );
};

export default page;
