"use client"
import React from "react";
import { Button } from "../ui/button";
import { Bookmark, MoveRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getDecodedToken } from "@/utils/decodeToken";
import { useMyContext } from "../MyContext";
import { authPayloads } from "@/constants/others.constants";
import { useRouter } from "next/navigation";
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";

type TProps = {
  className?: string;
  trainer: any
};
const Details = ({ className, trainer }: TProps) => {
  const { setIsAuthOpen, setAuthTitleData, setTrainerInfo } = useMyContext()
  const user = getDecodedToken()
  const router = useRouter()
  const saveTrainer = async () => {
    if (user?.role !== "user") {
      setAuthTitleData({ ...authPayloads["Log In"], redirect: `/trainers/${trainer?._id}` });
      setTrainerInfo(trainer)
      setIsAuthOpen(true);
      return
    } 
    const data = {
      userId : user?.id,
      trainerId : trainer?._id
     }
    const response = await fetchPostApi(`saveTrainer/saved-trainer`, data );
    if (response?.success === true) {
      await Swal.fire({
        icon: "success",
        title: "Report Submitted",
        timer: 3000,
        text: "Trainer saved  successfully!",
        confirmButtonText: "OK",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          response?.message ||
          "There was an issue Please try again later.",
        confirmButtonText: "OK",
      });
      Swal.close();
    }
  }

  return (
    <div className={cn("space-y-3 md:pt-5 md:pr-4", className)}>
      <h3 className="md:hidden text-2xl font-bold -mb-3">
        <span className="text-[#00C759]">{trainer?.rating?.overallRating ?? 0}</span>
        <span className="text-[11px] font-normal">/5</span>
      </h3>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-syne md:text-4xl lg:font-semibold text-black">
          {trainer?.firstName}{trainer?.lastName}
        </h1>
        <Bookmark  onClick={() => saveTrainer()} className="size-5 md:size-7" />
      </div>
      <div className="space-y-2 text-[14px] md:text-base">
        <p>
          Trainer at{" "}
          <Link
            href={`/studios/${"thomas Mullin"}`}
            className="underline underline-offset-2"
          >
            {trainer?.studioName} - {trainer?.neighborhood}
          </Link>
        </p>
        <p>Training Type: {trainer?.trainingType}</p>
      </div>
      <div className="flex justify-start gap-8 lg:gap-14 divide-x-2 place-content-center py-1 md:py-0">
        <div className="space-y-2">
          <h3 className="text-4xl lg:text-5xl font-semibold font-syne text-black">
            {trainer?.totalDiffcultTrainer}
          </h3>
          <p className="text-[14px] lg:text-base">Level of Difficulty</p>
        </div>
        <div className="pl-10 space-y-2">
          <h3 className="text-4xl lg:text-5xl font-semibold font-syne text-black">
            {trainer?.totalTakeClass}%
          </h3>
          <p className="text-[14px] lg:text-base">Would take again</p>
        </div>
      </div>
      <div className="space-y-2">
        <h5 className="font-sans text-2xl">Top Tags</h5>
        <div className="flex flex-wrap gap-3 drop-shadow-sm py-2">
          {trainer?.topTags.map((item: string, index: number) => (
            <p
              key={index}
              className="bg-[#EBEBEB] px-5 py-1 rounded-full text-sm"
            > {item}
            </p>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          if (user?.role === "user") {
            router.push(`/trainers/review/${trainer?._id}`)
            setTrainerInfo(trainer)
          } else {
            setAuthTitleData({ ...authPayloads["Log In"], redirect: `/trainers/review/${trainer?._id}` });
            setTrainerInfo(trainer)
            setIsAuthOpen(true);
          }
        }
        }
        className="rounded-full uppercase "
        variant={"default"}
        size={"lg"}
      >
        <span>Rate this trainer</span> <MoveRight />
      </Button>
    </div>
  );
};

export default Details;
