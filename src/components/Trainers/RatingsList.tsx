import React from "react";
// import { Button } from "../ui/button";
import ReportButton from "../SubComponent/ReportButton";
import { fetchGetApi } from "@/lib/fetchApi";

const RatingsList = async ({ id }: { id: string }) => {
  const trainerRating = await fetchGetApi(`trainer-review/single-trainer-review/${id}`,)
  return (
    <div>
      <h5 className="underline underline-offset-8">{trainerRating?.data?.length} Ratings</h5>
      <div className="h-[1.3px] w-full bg-[#B7B4FB] mt-5" />
      <div className="space-y-5 mt-10 max-w-6xl">
        {trainerRating?.data.map((item: any, index: number) => (
          <div
            key={index}
            className="space-y-5 border-2 border-[#B7B4FB] rounded-lg px-5 lg:px-7 py-8 bg-foreground"
          >
            <div className="flex justify-between">
              <h5 className="font-semibold text-sm">{new Date(item?.createdAt).toLocaleDateString()}</h5>
              <ReportButton id = {item?._id} />
            </div>
            <div className="flex flex-col md:flex-row justify-start lg:items-center gap-6 lg:gap-10">
              <div className="w-fit flex md:flex-col gap-6">
                <div className="space-y-3 text-center">
                  <h5 className="uppercase text-sm font-semibold">Rating</h5>
                  <div className="h-16 w-20 lg:h-20 lg:w-24 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
                    {item?.trainerRate}
                  </div>
                </div>
                <div className="space-y-3 text-center">
                  <h5 className="uppercase text-sm font-semibold">
                    Difficulty
                  </h5>
                  <div className="h-16 w-20 lg:h-20 lg:w-24 flex justify-center items-center text-xl bg-[#A3A3A3] font-semibold">
                    {item?.diffcultTrainer}
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4 lg:space-y-7">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
                  <p>Take Again: {item?.takeClass ? 'true' : 'false'}</p>
                  <p>Free Class: {item?.freeClass ? 'true' : 'false'}</p>
                  <p>
                    Music Choice:{' '}
                    {['Awful', 'Ok', 'Good', 'Great', 'Awesome'][item?.musicChoice - 1] || 'N/A'}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
                  {item?.tags.map((tag: string, index: number) => (
                    <p
                      key={index}
                      className="w-fit border border-[#B7B4FB] px-10 py-1.5 text-sm rounded-full"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <p className="text-sm lg:text-base">{item.des}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-8 lg:py-10 max-w-6xl">
        {/* <Button
          className="rounded-full uppercase tracking-wider"
          variant={"default"}
          size={"lg"}
        >
          Show More
        </Button> */}
      </div>
    </div>
  );
};

export default RatingsList;
