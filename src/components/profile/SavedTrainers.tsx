/* eslint-disable react-hooks/exhaustive-deps */
import { fetchGetApi } from "@/lib/fetchApi";
import { getDecodedToken } from "@/utils/decodeToken";
import { BookmarkCheck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import emptyImage from "@/assets/images/empty-image.png";

const SavedTrainers = () => {
  const [savedTrainer, setSavedTrainer] = useState<any>()
  const user = getDecodedToken()
  const fetchUser = async (userId: string) => {
    const userReview = await fetchGetApi(`saveTrainer/get-save-trainers/${userId}`);
    return userReview;
  }
  const getUserData = async () => {
    const data = await fetchUser(user?.id);
    setSavedTrainer(data?.data);
  };
  useEffect(() => {
    getUserData()
  }, [])
 

  return (
    <div className="max-w-5xl mx-auto space-y-5  mt-10">
      <div className="space-y-6">
        {savedTrainer?.trainers.map((item: any, index: number) => (
          <Link href={`/trainers/${item?.trainerId?._id}`} key={index}>
          <div key={index} className="flex justify-start items-center gap-4 lg:gap-6 border-2 border-[#B7B4FB] px-4 py-3 md:py-6 md:px-8 rounded-lg relative">
            <div className="space-y-2 text-center">
              <h5 className="uppercase text-sm font-semibold">Quantity</h5>
              <div className="h-16 w-20 lg:h-20 lg:w-24 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
                {item?.overallRating}
              </div>
              <p className="text-xs">{item?.reviewCount}Ratings</p>
            </div>
            <div className="space-y-1 w-full">
              <h1 className="text-xl lg:text-2xl font-medium">{item?.trainerId?.firstName} {item?.trainerId?.lastName}</h1>
              <p className="">Department: {item?.trainerId?.studioName}</p>
              <p className="font-bold text-lg pt-2">
                 {item?.diffcultyTrainer}
                <span className="font-normal text-base">
                  {" "}
                  level of difficulty
                </span>{" "}
              </p>
            </div>
            <BookmarkCheck className="size-4 md:size-5 absolute top-4 right-4 cursor-pointer" />
          </div>
           </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedTrainers;
