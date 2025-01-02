import React, { useEffect, useState } from "react";

import Link from "next/link";
import { fetchGetApi } from "@/lib/fetchApi";
import { getDecodedToken } from "@/utils/decodeToken";
import UserRating from "./UserRating";
import Qualtity from "./Qualtity";

const MyRatings = () => {
  const [userReview, setUserReview] = useState<any>()
  const user = getDecodedToken()
  const fetchUser = async (userId: string) => {
    const userReview = await fetchGetApi(`user/my-review/${userId}`);
    return userReview;
  }
  const getUserData = async () => {
    const data = await fetchUser(user?.id);
    setUserReview(data?.data);
  };
  useEffect(() => {
    getUserData()
  }, [])


  return (
    <div className="max-w-5xl mx-auto space-y-5  mt-10">
      <div className="space-y-6">
        {userReview?.studio?.length > 0 && userReview.studio.map((item: any, index: number) => (
          <div
            key={index}
            className="space-y-3 border-2 border-[#B7B4FB] rounded-lg px-5 bg-foreground py-4"
          >
            <p className="font-medium text-sm"> {new Date(item?.createdAt).toLocaleDateString()}</p>
            <h3 className="text-xl md:text-2xl font-medium text-black border-b border-gray-800">
              {item?.studioId?.studioName}
            </h3>
            <div className="flex flex-col lg:flex-row justify-start gap-6 pt-2">
              <div className="space-y-3 text-center w-fit">
                <h5 className="uppercase text-sm font-semibold">Quantity</h5>
                <Qualtity item={item}></Qualtity>
              </div>
              <UserRating item={item} ></UserRating>

            </div>
          </div>
        ))}
        {userReview?.trainer?.length > 0 && userReview.trainer.map((item: any, index: number) => (
          <div
            key={index}
            className="space-y-5 border-2 border-[#B7B4FB] rounded-lg px-5 py-4 bg-foreground"
          >
            <p className="text-sm">{new Date(item?.createdAt).toLocaleDateString()}</p>
            <h3 className="text-xl md:text-2xl font-medium text-black border-b border-gray-800">
              {item?.trainerId?.firstName}{item?.trainerId?.lastName}
              <Link href={`/studios/${item.trainerId.studioId}`} className="underline text-sm">
                {item?.trainerId?.studioName}
              </Link>
            </h3>
            <div className="flex flex-col md:flex-row justify-start lg:items-center gap-6">
              <div className="w-fit flex md:flex-col gap-4">
                <div className="space-y-3 text-center">
                  <h5 className="uppercase text-sm font-semibold">Rating</h5>
                  <div className="h-16 w-20 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
                    {item?.trainerRate}
                  </div>
                </div>
                <div className="space-y-3 text-center">
                  <h5 className="uppercase text-sm font-semibold">
                    Difficulty
                  </h5>
                  <div className="h-16 w-20 flex justify-center items-center text-xl bg-[#A3A3A3] font-semibold">
                    {item?.diffcultTrainer}
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
                  <p>Take Again: {item?.takeClass}</p>
                  <p>Free class: {item?.freeClass}</p>
                  <p>
                    Music Choice:{' '}
                    {['Awful', 'Ok', 'Good', 'Great', 'Awesome'][item?.musicChoice - 1] || 'N/A'}
                  </p>
                </div>
               <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
                  {item?.tags.map((tag : any, index : number) => (
                    <p
                      key={index}
                      className="w-fit border border-[#B7B4FB] px-10 py-1.5 text-sm rounded-full"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <p className="text-sm lg:text-base">{item?.writeReview}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
