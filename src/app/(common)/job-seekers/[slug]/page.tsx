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
import { TPageProps } from "@/types";
import { getSeekerDetails } from "@/services";
import BookmarkButton from "@/components/ui/BookmarkButton";
import { TCv } from "@/redux/features/auth/authSlice";
import CvDownloadBtn from "@/components/ui/CvDownloadBtn";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import { filterData } from "@/constants/filter.const";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import { imageUrl } from "@/config";

const page = async (props: TPageProps) => {
  const { slug } = await props.params;
  const data = await getSeekerDetails(slug);
  // console.log(data);
  const personalInfo = [
    {
      label: "DATE OF BIRTH",
      value: data?.data?.candidateInfo?.dateOfBrith
        ? new Date(data?.data?.candidateInfo?.dateOfBrith).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )
        : "N/A",
      icon: LiaBirthdayCakeSolid,
    },
    {
      label: "NATIONALITY",
      value: data?.data?.candidateInfo?.nationality ?? "N/A",
      icon: FaRegMap,
    },
    {
      label: "GENDER",
      value: data?.data?.candidateInfo?.gender ?? "N/A",
      icon: FaRegUser,
    },
    {
      label: "MARITAL STATUS",
      value: data?.data?.candidateInfo?.maritalStatus
        ? data?.data?.candidateInfo?.maritalStatus
        : "N/A",
      icon: LuBookHeart,
    },
    {
      label: "EXPERIENCE",
      value: getSpecificLabel(
        filterData[0].options,
        data?.data?.candidateInfo?.experience,
        "-"
      ),
      icon: GoStack,
    },
    {
      label: "EDUCATION",
      value: data?.data?.candidateInfo?.educations
        .slice(0, 2)
        .map((edu: string, i: number) => `${i !== 0 ? ", " : ""}` + edu),
      icon: PiGraduationCap,
    },
  ];

  const shareLinks = [
    {
      icon: FaYoutube,
      url: data?.data?.candidateInfo?.youtube,
      label: "Youtube",
    },
    {
      icon: FaFacebookF,
      url: data?.data?.candidateInfo?.facebook,
      label: "Facebook",
    },
    {
      icon: FaInstagramSquare,
      url: data?.data?.candidateInfo?.instagram,
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      url: data?.data?.candidateInfo?.linkedin,
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      url: data?.data?.candidateInfo?.twitter,
      label: "Twitter",
    },
  ];
  return (
    <>
      <Container
        className="bg-lightgray hidden lg:block"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">Seeker Details</p>
        <p className="text-sm">
          <span className="text-brand/60">Home / Find Job </span>/ Seeker
          Details
        </p>
      </Container>
      <LoaderWraperComp
        isLoading={false}
        isError={!data.success}
        error={data}
        className="h-[75vh]"
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
                  src={imageUrl + data?.data?.candidateInfo?.logo}
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5 ">
                <h5 className="text-2xl font-semibold text-brand">
                  {data?.data?.fullName ?? "N/A"}
                </h5>
                <p className="text-lg text-brand/60">
                  {data?.data?.candidateInfo?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookmarkButton
                dataId={data?.data?._id}
                className="w-6 h-6"
                size="large"
              />
              <Button
                href={`mailto:${data?.data?.candidateInfo?.email}`}
                target="_blank"
                type="primary"
                size="large"
                style={{ padding: "0 2rem" }}
              >
                <FiMail size={18} /> Send Mail
              </Button>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-brand">BIOGRAPHY</h5>
            {data?.data?.candidateInfo?.biography ? (
              <div
                className="no-tailwind"
                dangerouslySetInnerHTML={{
                  __html: data?.data?.candidateInfo?.biography,
                }}
              ></div>
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6 gap-x-3 gap-y-8 p-8 sm:p-10 border border-gray-300 rounded-xl">
            {personalInfo.map((detail, index) => (
              <JobOverviewCart data={detail} key={index} />
            ))}
          </div>
          <div className="p-8 sm:p-10 border border-gray-300 rounded-xl">
            <h5 className="font-semibold mb-3 text-brand">
              Contact Information
            </h5>
            <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-9">
              <div className="space-y-2 w-full">
                <div className="flex gap-5 items-center py-5">
                  {createElement(MdOutlinePhoneInTalk, {
                    className: "size-6 sm:size-7 text-primary",
                  })}
                  <div className="space-y-1">
                    <p className="text-sm text-brand/60">{"Phone"}</p>
                    <h5 className="text-lg text-brand font-medium">
                      +{data?.data?.candidateInfo?.phone ?? "N/A"}
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
                      {data?.data?.candidateInfo?.contactEmail ?? "N/A"}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="space-y-2 w-full">
                <div className="flex gap-5 items-center py-5">
                  {createElement(TfiWorld, {
                    className: "size-6 sm:size-7 text-primary",
                  })}
                  <div className="space-y-1">
                    <p className="text-sm text-brand/60">
                      {"Personal website"}
                    </p>
                    <h5 className="text-lg text-brand font-medium">
                      {data?.data?.candidateInfo?.parsonalWebsite ?? "N/A"}
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
                        {data?.data?.candidateInfo?.address ?? "N/A"}
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
          <div className="flex flex-col md:flex-row justify-between">
            {shareLinks.filter((link) => !!link.url).length > 0 && (
              <div className="border-t border-gray-300 py-8 w-10/12 sm:w-6/12 lg:w-8/12">
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
            {data?.data?.candidateInfo?.cv?.map((cv: TCv) => (
              <div
                key={cv._id}
                className="flex justify-between items-center p-8 border border-gray-300 rounded-xl w-full sm:w-5/12 lg:w-3/12"
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
                <CvDownloadBtn path={cv.file} />
              </div>
            ))}
          </div>
        </Container>
      </LoaderWraperComp>
    </>
  );
};

export default page;
