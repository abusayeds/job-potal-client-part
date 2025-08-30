"use client";

import React, { createElement } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { Button } from "antd";
import { PiGraduationCap, PiMapPinLineDuotone } from "react-icons/pi";
import { FiMail } from "react-icons/fi";
import JobOverviewCart from "@/components/Jobs/JobOverviewCart";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaRegMap,
  FaRegUser,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { LuBookHeart } from "react-icons/lu";
import { GoMail, GoStack } from "react-icons/go";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { useApplicationDetailsQuery } from "@/redux/features/application/application.api";
import { useParams } from "next/navigation";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import { filterData } from "@/constants/filter.const";
import { TCv } from "@/redux/features/auth/authSlice";
import { handleDownload } from "@/utils/fileDownloadFromUrl";
import { imageUrl } from "@/config";
import BookmarkButton from "@/components/ui/BookmarkButton";

const Page = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useApplicationDetailsQuery(
    slug as string
  );
  const personalInfo = [
    {
      label: "DATE OF BIRTH",
      value: new Date(
        data?.data?.userId?.candidateInfo?.dateOfBrith
      ).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      icon: LiaBirthdayCakeSolid,
    },
    {
      label: "NATIONALITY",
      value: data?.data?.userId?.candidateInfo?.nationality ?? "N/A",
      icon: FaRegMap,
    },
    {
      label: "GENDER",
      value: data?.data?.userId?.candidateInfo?.gender ?? "N/A",
      icon: FaRegUser,
    },
    {
      label: "MARITAL STATUS",
      value: data?.data?.userId?.candidateInfo?.maritalStatus ?? "N/A",
      icon: LuBookHeart,
    },
    {
      label: "EXPERIENCE",
      value: getSpecificLabel(
        filterData[0].options,
        data?.data?.userId?.candidateInfo?.experience,
        "-"
      ),
      icon: GoStack,
    },
    {
      label: "EDUCATION",
      value: data?.data?.userId?.candidateInfo?.educations.map(
        (item: string, i: number) => `${i !== 0 ? ", " : ""}` + item
      ),
      icon: PiGraduationCap,
    },
  ];

  const shareLinks = [
    {
      icon: FaYoutube,
      url: data?.data?.userId?.candidateInfo?.youtube,
      label: "Youtube",
    },
    {
      icon: FaFacebookF,
      url: data?.data?.userId?.candidateInfo?.facebook,
      label: "Facebook",
    },
    {
      icon: FaInstagramSquare,
      url: data?.data?.userId?.candidateInfo?.instagram,
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      url: data?.data?.userId?.candidateInfo?.linkedin,
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      url: data?.data?.userId?.candidateInfo?.twitter,
      label: "Twitter",
    },
  ];
  return (
    <LoaderWraperComp
      isError={isError}
      isLoading={isLoading}
      className="h-[80vh]"
    >
      <Container className="relative" mClassName="space-y-10 lg:space-y-16">
        <div
          className={cn(
            "w-fit lg:w-full mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 bg-white rounded-lg px-8 lg:px-10 py-6 shadow-sm"
          )}
        >
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="flex-shrink-0 w-16 rounded-full overflow-hidden border border-gray-50 drop-shadow-sm">
              <Image
                src={imageUrl + data?.data?.userId?.candidateInfo?.logo}
                alt="logo"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-1.5 ">
              <h5 className="text-2xl font-semibold text-brand">
                {data?.data?.userId?.fullName ?? "N/A"}
              </h5>
              <p className="text-lg text-brand/60">
                {data?.data?.userId?.candidateInfo?.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="text" size="large" style={{ background: "#E7F0FA" }}>
              <BookmarkButton
                dataId={data?.data?.userId?.candidateInfo?._id}
                className="w-6 h-6"
                size="large"
              />
            </Button>
            <Button
              href={`mailto:${data?.data?.userId?.candidateInfo?.contactEmail}`}
              target="_blank"
              type="primary"
              size="large"
              style={{ padding: "0 2rem" }}
            >
              <FiMail size={18} /> Send Mail
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 xl:grid-cols-10 gap-12 lg:gap-5 xl:gap-8 2xl:gap-16"
          )}
        >
          <div className="col-span-1 xl:col-span-6 space-y-8 lg:pr-4 2xl:pr-8 divide-y divide-gray-300">
            <div className="pb-8">
              <h5 className="font-semibold mb-3 text-brand">BIOGRAPHY</h5>
              {data?.data?.userId?.candidateInfo?.biography ? (
                <div
                  className="no-tailwind"
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.userId?.candidateInfo?.biography,
                  }}
                ></div>
              ) : (
                <p>N/A</p>
              )}
            </div>
            <div className="pb-8">
              <h5 className="font-semibold mb-3 text-brand">COVER LETTER</h5>
              {data?.data?.coverLetter ? (
                <div
                  className="no-tailwind"
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.coverLetter,
                  }}
                ></div>
              ) : (
                <p>N/A</p>
              )}
            </div>
            {shareLinks.filter((link) => !!link.url).length > 0 && (
              <div className="">
                <h5 className="font-semibold mb-3 text-brand">
                  Follow on Social Media
                </h5>
                <div className="flex gap-3 pt-2">
                  {shareLinks
                    .filter((link) => !!link.url)
                    .map((link, index) => (
                      <Button
                        key={index}
                        href={link.url}
                        target="_blank"
                        size="large"
                        style={{ height: "40px" }}
                      >
                        <link.icon size={20} />
                        {/* {link.label} */}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
          {/* order-first xl:order-last */}
          <div className="col-span-1 xl:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-x-3 gap-y-8">
              {personalInfo.map((detail, index) => (
                <JobOverviewCart data={detail} key={index} />
              ))}
            </div>
            {data?.data?.userId?.candidateInfo?.cv?.length > 0 && (
              <div className="p-8 border border-gray-300 rounded-xl w-full space-y-4">
                <h5 className="font-semibold mb-3 text-brand">
                  Download CV/Resume
                </h5>
                {data?.data?.userId?.candidateInfo?.cv?.map((cv: TCv) => (
                  <div
                    key={cv._id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-3 items-center">
                      {createElement(IoDocumentTextOutline, {
                        className: "size-10 text-gray-400",
                      })}
                      <div className="space-y-1">
                        <p className="text-sm text-brand/60">{cv.name}</p>
                        <h5 className="text-sm text-brand font-medium uppercase">
                          {cv.file.split(".").pop()}
                        </h5>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownload(cv.file)}
                      type="text"
                      size="large"
                    >
                      <BsDownload size={22} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-8 sm:p-10 border border-gray-300 rounded-xl">
              <h5 className="font-semibold mb-3 text-brand">
                Contact Information
              </h5>
              <div className="flex flex-col justify-between divide-y divide-gray-300">
                <div className="flex gap-5 items-center py-5">
                  {createElement(MdOutlinePhoneInTalk, {
                    className: "size-6 sm:size-7 text-primary",
                  })}
                  <div className="space-y-1">
                    <p className="text-sm text-brand/60">{"Phone"}</p>
                    <h5 className="text-lg text-brand font-medium">
                      +{data?.data?.userId?.candidateInfo?.phone}
                    </h5>
                  </div>
                </div>
                <div className="flex gap-5 items-center py-5">
                  {createElement(GoMail, {
                    className: "size-6 sm:size-7 text-primary",
                  })}
                  <div className="space-y-1">
                    <p className="text-sm text-brand/60">{"Email Address"}</p>
                    <h5 className="text-lg text-brand font-medium">
                      {data?.data?.userId?.candidateInfo?.contactEmail}
                    </h5>
                  </div>
                </div>
                <div className="flex gap-5 items-center py-5">
                  {createElement(TfiWorld, {
                    className: "size-6 sm:size-7 text-primary",
                  })}
                  <div className="space-y-1">
                    <p className="text-sm text-brand/60">
                      {"Personal website"}
                    </p>
                    <h5 className="text-lg text-brand font-medium">
                      {data?.data?.userId?.candidateInfo?.parsonalWebsite ??
                        "N/A"}
                    </h5>
                  </div>
                </div>
                <div className="py-5">
                  <div className="flex gap-5 items-center">
                    {createElement(PiMapPinLineDuotone, {
                      className: "size-6 sm:size-7 text-primary",
                    })}
                    <div className="space-y-1">
                      <p className="text-sm text-brand/60">{"Location"}</p>
                      <h5 className="text-lg text-brand font-medium">
                        {data?.data?.userId?.candidateInfo?.address}
                      </h5>
                    </div>
                  </div>
                  {/* <span className="text-sm text-brand/50">
                    Zone/Block Basement 1 Unit B2, 1372 Spring Avenue, Portland,{" "}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </LoaderWraperComp>
  );
};

export default Page;
