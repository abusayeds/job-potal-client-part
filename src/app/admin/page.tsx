"use client";

import AdminStatus from "@/components/Admin/Home/AdminStatus";
import EarningBarChart from "@/components/Admin/Home/EarningBarChart";
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboard.api";
import { CgBriefcase } from "react-icons/cg";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { LuUserRoundSearch } from "react-icons/lu";
import { TbUserShield } from "react-icons/tb";

const Page = () => {
  const { data } = useGetDashboardDataQuery({});
  // console.log(data);

  const dataDashboard = data?.data || [];

  const dataE = [
    {
      icon: HiOutlineCurrencyDollar,
      label: "earnings",
      value: dataDashboard.totalEarning ?? "N/A",
    },
    {
      icon: LuUserRoundSearch,
      label: "Job Seeker’s",
      value: dataDashboard.totalCandidate ?? "N/A",
    },
    {
      icon: TbUserShield,
      label: "Employer’s",
      value: dataDashboard.totalEmployer ?? "N/A",
    },
    {
      icon: CgBriefcase,
      label: "Jobs",
      value: dataDashboard.totalJobPost ?? "N/A",
    },
  ];
  return (
    <div className="space-y-5">
      <AdminStatus data={dataE} />
      <EarningBarChart />
    </div>
  );
};

export default Page;
