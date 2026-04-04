import React from "react";
import { Button } from "antd";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { TUser } from "@/redux/features/auth/authSlice";
import { imageUrl } from "@/config";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import { filterData } from "@/constants/filter.const";
import Link from "next/link";
import { VscOrganization } from "react-icons/vsc";

const EmployerCard = ({ employerData }: { employerData: TUser }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 relative">
      {/* Left section with avatar and info */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-shrink-0 w-20 xl:w-24 drop-shadow-xs">
          <Image
            src={imageUrl + employerData.logo}
            alt="logo"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile info */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl  text-gray-900 pb-1">
            {employerData.companyName ?? "N/A"}
          </h2>
          <p className="text-gray-600 font-medium">
            {getSpecificLabel(
              filterData[3].options,
              employerData.industry as string
            ) ?? "N/A"}
          </p>

          {/* Location and experience */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <LuMapPin className="w-4 h-4" />
              <span>{employerData.address ?? "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <VscOrganization className="w-4 h-4" />
              <span>Team size {employerData.teamSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right section with actions */}
      <div className="flex items-center gap-3 mt-2 lg:mt-0">
        <div className="flex-1 w-full">
          <Link href={`/employers/${employerData._id}`}>
            <Button
              size="large"
              type="text"
              style={{ background: "#E7F0FA", width: "100%" }}
            >
              <span>View Details</span>
              <BsArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        {/* <div className="absolute lg:static top-4 right-3 bg-white rounded-full">
          <BookmarkButton
            dataId={employerData._id}
            className="w-6 h-6"
            size="large"
          />
        </div> */}
      </div>
    </div>
  );
};

export default EmployerCard;
