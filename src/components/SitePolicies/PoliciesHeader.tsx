"use client";
import React from "react";
import Container from "../Container";
import { usePathname } from "next/navigation";
import { TUniObject } from "@/types";

const PoliciesHeader = ({ items }: { items: TUniObject[] }) => {
  const pathname = usePathname();

  return (
    <Container
      className="bg-lightgray"
      mClassName="py-3 lg:py-4 xl:py-5 space-y-3 lg:space-y-4"
    >
      <div className="flex justify-between items-center">
        <p className="sm:text-lg">
          {items.find((item) => item.link === pathname)?.title ?? ""}
        </p>
        <p className="text-sm">
          <span className="text-brand/60">Home</span> /{" "}
          {items.find((item) => item.link === pathname)?.title ?? ""}
        </p>
      </div>
    </Container>
  );
};

export default PoliciesHeader;
