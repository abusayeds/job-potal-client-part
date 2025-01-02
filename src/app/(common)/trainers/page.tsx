
import React from "react";
import Container from "@/components/Container";
import ResultEmpty from "@/components/SubComponent/ResultEmpty";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchGetApi,  } from "@/lib/fetchApi";

type SearchParams = Promise<{ [key: string]: string }>;
const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { search: searchValue } = await searchParams;
  const queryParams = [
    { name: "searchTerm", value: searchValue },
  ];
  const endpoint = "trainer/trainers";
  const trainerResponse = await fetchGetApi(endpoint, queryParams, )
  const trainers = trainerResponse?.data?.trainers;
  const trainTypesValus = ["Heated Yoga", "Pilates", "Lagree", "Boxing", "HIIT", "Others"];
  return (
    <Container>
      { trainers?.length > 0 ? (
        <>
          <div className="pt-8 pb-10 mb-8 space-y-5 border-b ">
            <div className="text-sm">
              <span className="font-semibold italic">{trainers?.length}</span>{" "}
              trainer with{" "}
              <span className="font-semibold italic">“ {searchValue} ”</span> in
              their name.
            </div>
            <Select >
              <SelectTrigger className="w-full max-w-80 h-12 rounded-xl">
                <SelectValue placeholder=" " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {trainTypesValus.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
            <div className="col-span-9">
              <div className="w-full flex flex-col gap-5">
                {trainers?.map((item: any, index: number) => (
                  <Link href={`/trainers/${item._id}`} key={index}>
                    <div className="flex justify-start items-center gap-4 lg:gap-6 border-2 border-[#B7B4FB] px-4 py-3 md:py-6 md:px-8 rounded-lg relative">
                      <div className="space-y-2 text-center">
                        <h5 className="uppercase text-sm font-semibold">
                          Overall
                        </h5>
                        <div className="h-16 w-20 lg:h-20 lg:w-24 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
                          {item?.overallRating}
                        </div>
                        <p className="text-xs">{item?.reviewCount} Total review</p>
                      </div>
                      <div className="space-y-1 w-full">
                        <h1 className="text-xl lg:text-2xl font-medium">
                          {item?.firstName}{item?.lastName}
                        </h1>
                        <p className="">Department: {item?.studioName}</p>
                        <p className="font-bold text-lg pt-2">
                          {item?.diffcultyTrainer}
                          <span className="font-normal text-base ml-2">

                            level of difficulty
                          </span>{" "}
                        </p>
                      </div>
                      <Bookmark className="size-4 md:size-5 absolute top-4 right-4" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-1 justify-center py-8 lg:py-10 max-w-56 mx-auto text-center">
                {/* <Button
                  className="w-fit block mx-auto rounded-full uppercase tracking-wider"
                  variant={"default"}
                  size={"lg"}
                >
                  Show More
                </Button> */}
                <p className="text-sm pt-2">
                  Don’t see the trainer you’re looking for?
                </p>
                <Link
                  href={`/trainers/add`}
                  className="underline underline-offset-2 text-sm"
                >
                  Add a Trainer
                </Link>
              </div>
            </div>
            <div className="col-span-3 h-full hidden lg:flex flex-col justify-start gap-8">
              <div className="bg-[#F7F7F7] rounded-sm h-52">
                <h1 className="bg-white w-full text-center">Advertisement</h1>
              </div>
              <div className="bg-[#F7F7F7] rounded-sm h-52">
                <h1 className="bg-white w-full text-center">Advertisement</h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ResultEmpty title="Trainer" forword="/trainers/add" />
      )}
    </Container>
  );
};

export default Page;
