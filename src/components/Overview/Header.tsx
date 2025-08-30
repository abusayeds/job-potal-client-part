"use client";

import { useDashboardOverviewQuery } from "@/redux/features/users/users.api";
import { useAppSelector } from "@/redux/hook";
import { cn } from "@/utils/cn";
import { createElement } from "react";
import { BiShuffle } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiBriefcase, PiListHeart } from "react-icons/pi";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data} = useDashboardOverviewQuery(undefined);
  const seekerStats = [
    {
      title: "Applied jobs",
      count: data?.data?.appliedJobs ?? "N/A",
      icon: PiBriefcase,
      iconColor: "blue",
      backgroundColor: "bg-blue-100/80",
    },
    {
      title: "Favorite jobs",
      count: data?.data?.favoritesjobs ?? "N/A",
      icon: IoBookmarkOutline,
      iconColor: "orange",
      backgroundColor: "bg-yellow-100/80",
    },
    {
      title: "Job Alerts",
      count: data?.data?.jobAlerts ?? "N/A",
      icon: HiOutlineBellAlert,
      iconColor: "green",
      backgroundColor: "bg-green-100/80",
    },
  ];
  const employerStats = [
    {
      title: "Open Jobs",
      count: data?.data?.openJobs ?? "N/A",
      icon: PiBriefcase,
      iconColor: "blue",
      backgroundColor: "bg-blue-100/80",
    },
    {
      title: "Expire Job",
      count: data?.data?.expriredJobs ?? "N/A",
      icon: BiShuffle,
      iconColor: "green",
      backgroundColor: "bg-green-100/80",
    },
    {
      title: "Saved Candidates",
      count: data?.data?.saveCandidate ?? "N/A",
      icon: PiListHeart,
      iconColor: "orange",
      backgroundColor: "bg-yellow-100/80",
    },
  ];
  // console.log({ data, isLoading, isError });
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-lg font-medium">Hello, {user?.fullName} </p>
        <p className="text-sm text-brand/60">
          Here is your daily activities and{" "}
          {user?.role === "candidate" ? "job alerts" : "applications"}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 ">
        {(user?.role === "candidate" ? seekerStats : employerStats).map(
          (status, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg flex justify-between items-center p-5 xl:p-6 w-full drop-shadow-xs",
                status.backgroundColor
              )}
            >
              <div className="space-y-2 pl-2">
                <h1 className="font-semibold text-3xl">{status.count}</h1>
                <p className="text-sm text-brand/700">{status.title}</p>
              </div>
              <div className="p-3 rounded-md bg-white">
                {createElement(status.icon, {
                  className: "w-8 h-8 text-[#FFA500]",
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
