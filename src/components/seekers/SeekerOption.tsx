"use client";
import React from "react";
import { FiDownload } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { TUser } from "@/redux/features/auth/authSlice";
import { handleDownload } from "@/utils/fileDownloadFromUrl";

const SeekerOption = ({ seeker }: { seeker: TUser }) => {
 
  return (
    <div className="flex flex-col text-start space-y-1">
      <a
        href={`/job-seekers/${seeker._id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="text-brand text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 w-32 cursor-pointer flex items-center gap-2 rounded-xs">
          <GrView size={14} /> View Profile
        </button>
      </a>
      <a href={`mailto:${seeker.contactEmail}`}>
        <button className="text-brand text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 w-32 cursor-pointer flex items-center gap-2 rounded-xs">
          <MdOutlineEmail size={14} /> Send Email
        </button>
      </a>

      {/* <button
        onClick={() => handleDownload(seeker?.cv?.[0]?.file)}
        className="text-start bg-gray-50 hover:bg-gray-100 py-0.5 px-2 w-32 cursor-pointer flex items-center gap-2 rounded-xs"
      >
        <FiDownload size={14} /> Download CV
      </button> */}
    </div>
  );
};

export default SeekerOption;
