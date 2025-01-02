"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type TEmptyProps = {
  title: string;
  forword: string;
};

const ResultEmpty = ({ title, forword }: TEmptyProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  return (
    <div className="space-y-16">
      <div className="pt-8 pb-12  border-b text-sm">
        <span className="font-semibold">0</span> {title}s with{" "}
        <span className="font-semibold italic">“ {searchValue} ”</span> in their
        name.
      </div>
      <div className="max-w-4xl bg-[#EBEBEB] rounded-lg flex flex-col items-center justify-center gap-5 p-10 ">
        <p>Don’t see the {title} you are Looking For?</p>
        <Button
          onClick={() => router.push(forword)}
          className="rounded-full uppercase "
          variant={"default"}
          size={"lg"}
        >
          Add {title}
        </Button>
      </div>
    </div>
  );
};

export default ResultEmpty;
