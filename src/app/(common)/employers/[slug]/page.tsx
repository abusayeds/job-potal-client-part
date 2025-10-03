import React, { createElement } from "react";
import Container from "@/components/Container";
import { Button } from "antd";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { VscOrganization } from "react-icons/vsc";
import { IoBagAddOutline } from "react-icons/io5";
import { SiStartrek } from "react-icons/si";
import { LiaIndustrySolid } from "react-icons/lia";
import { SlOrganization } from "react-icons/sl";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { GoMail } from "react-icons/go";
import EmployerOverviewCart from "@/components/Employers/EmployerOverviewCart";
import { TPageProps } from "@/types";
import { getEmployerDetails } from "@/services";
import { imageUrl } from "@/config";
import ShareComponent from "@/components/ui/ShareComponent";
import { getSpecificLabel } from "@/lib/getLabelFromArray";
import { filterData } from "@/constants/filter.const";
import { formatTwoDigits } from "@/lib/getTwoDisit";
import Link from "next/link";
import LoaderWraperComp from "@/components/LoaderWraperComp";

const page = async (props: TPageProps) => {
  const { slug } = await props.params;
  const data = await getEmployerDetails(slug);
  const shareLinks = [
    { icon: FaYoutube, url: data?.data?.youtube, label: "Youtube" },
    { icon: FaFacebookF, url: data?.data?.facebook, label: "Facebook" },
    {
      icon: FaInstagramSquare,
      url: data?.data?.instagram,
      label: "Instagram",
    },
    { icon: FaLinkedinIn, url: data?.data?.linkedIn, label: "LinkedIn" },
    { icon: FaTwitter, url: data?.data?.twitter, label: "Twitter" },
  ];
  const companyInfo = [
    {
      label: "FOUNDED IN:",
      value: new Date(data?.data?.foundIn).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      icon: SiStartrek,
    },
    {
      label: "ORGANIZATION TYPE",
      value: data?.data?.organizationType,
      icon: SlOrganization,
    },
    {
      label: "INDUSTRY TYPES",
      value: getSpecificLabel(filterData[3].options, data?.data?.industry),
      icon: LiaIndustrySolid,
    },
    {
      label: "TEAM SIZE",
      value: `${formatTwoDigits(data?.data?.teamSize)} Employee`,
      icon: VscOrganization,
    },
  ];
  const contactInfoData = [
    {
      type: "Website",
      icon: TfiWorld,
      label: data?.data?.companyWebsite ?? "N/A",
      value: data?.data?.companyWebsite ?? "N/A",
    },
    {
      type: "Phone",
      icon: MdOutlinePhoneInTalk,
      label: data?.data?.phone ? `+${data?.data?.phone}` : "Na/A",
      value: data?.data?.phone ? `+${data?.data?.phone}` : "Na/A",
    },
    {
      type: "Email Address",
      icon: GoMail,
      label: data?.data?.contactEmail ?? "N/A",
      value: data?.data?.contactEmail ?? "N/A",
    },
  ];
  return (
    <>
      <Container
        className="bg-lightgray hidden lg:block"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">Employer Details</p>
        <p className="text-sm">
          <span className="text-brand/60">Home / Employers</span> / Employer
          Details
        </p>
      </Container>
      <LoaderWraperComp
        isLoading={false}
        isError={!data.success}
        error={data}
        className="h-[75vh]"
      >
        <Container className="relative" mClassName="">
          <div className="w-full h-[180px] z-0">
            <Image
              src={imageUrl + data?.data?.banner}
              alt="background"
              width={1000}
              height={1000}
              // fill
              // sizes="100vw"
              // style={{
              //   objectFit: "cover",
              //   zIndex: -1,
              //   borderRadius: "0.5rem",
              // }}
              className="w-full h-full object-cover rounded-lg drop-shadow-sm"
            />
          </div>
          <div className="-mt-16 w-full px-[7%] lg:px-[5%] drop-shadow-xl">
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-8 bg-white rounded-lg px-6 py-6 z-10">
              <div className="flex flex-col lg:flex-row gap-3 justify-between items-center">
                <div className="flex-shrink-0 w-20 rounded-full overflow-hidden border border-gray-50 drop-shadow-sm">
                  <Image
                    src={imageUrl + data?.data?.logo}
                    alt="logo"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="space-y-2.5 text-center lg:text-start">
                  <h5 className="text-2xl">Condax</h5>
                  <p className="text-brand/60">{data?.data?.companyName}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 bg-primary/10 w-full lg:w-fit lg:min-w-sm py-4 px-4 sm:px-6 lg:px-8 rounded">
                <div className="flex gap-3 items-center">
                  <div className="bg-white p-2 sm:p-3 rounded">
                    <IoBagAddOutline size={25} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="sm:text-lg font-semibold">
                      {formatTwoDigits(data?.data?.activeJobs)}
                    </p>
                    <p className="text-sm text-brand/60"> Current Job</p>
                  </div>
                </div>
                <Link href={`/employers/${data?.data?._id}/jobs`}>
                  <Button size="large" type="text">
                    <span>View All</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-5 xl:gap-10 2xl:gap-16 mt-12 lg:divide-x divide-gray-200">
            <div className="col-span-1 lg:col-span-5 space-y-8 lg:pr-4 2xl:pr-8">
              <div>
                <h5 className="font-semibold mb-3 text-brand">Description</h5>
                {data?.data?.about ? (
                  <div
                    className="no-tailwind"
                    dangerouslySetInnerHTML={{
                      __html: data?.data?.about,
                    }}
                  ></div>
                ) : (
                  <p>N/A</p>
                )}
              </div>
              <div>
                <h5 className="font-semibold mb-3 text-brand">
                  Company Benefits
                </h5>
                <div className="text-brand/70">
                  <ul className="list-disc pl-10 space-y-3">
                    {data.data?.benefits?.map(
                      (benefit: string, index: number) => (
                        <li key={index}>{benefit}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-3 text-brand">
                  Company Vision
                </h5>
                {data?.data?.companyVision ? (
                  <div
                    className="no-tailwind"
                    dangerouslySetInnerHTML={{
                      __html: data?.data?.companyVision,
                    }}
                  ></div>
                ) : (
                  <p>N/A</p>
                )}
              </div>
              <div className="flex gap-3 items-center flex-wrap">
                <span className="pr-2 text-lg whitespace-pre w-full">
                  Share here :
                </span>{" "}
                <ShareComponent shareUrl={`/employers/${data?.data?._id}`} />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-4 space-y-8 order-first lg:order-last">
              <div className="px-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-3 gap-y-8">
                  {companyInfo.map((detail, index) => (
                    <EmployerOverviewCart data={detail} key={index} />
                  ))}
                </div>
              </div>
              <div className="p-6 border-2 border-gray-100 rounded-lg">
                <h5 className="font-semibold mb-3 text-brand">
                  Contact Information
                </h5>
                <div className="divide-y divide-gray-200">
                  {contactInfoData.map((info, index) => (
                    <div className="flex gap-5 items-center py-5" key={index}>
                      {createElement(info.icon, {
                        className: "size-6 sm:size-7 text-primary",
                      })}
                      <div className="space-y-1">
                        <p className="text-sm text-brand/60 uppercase">
                          {info.type}
                        </p>
                        <h5 className="text-lg text-brand font-medium">
                          {info.value}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {shareLinks.filter((item) => !!item.url).length > 0 && (
                <div className="p-6 border-2 border-gray-100 rounded-lg">
                  <h5 className="font-semibold mb-4 text-brand">
                    Follow us on:
                  </h5>
                  <div className="space-x-1">
                    {shareLinks
                      .filter((item) => !!item.url)
                      .map((link, index) => (
                        <Button
                          key={index}
                          type="text"
                          href={link.url}
                          target="_blank"
                          size="large"
                          style={{ height: "40px" }}
                        >
                          <link.icon size={20} />
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </LoaderWraperComp>
    </>
  );
};

export default page;
