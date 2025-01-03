
import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import award from "@/assets/svgs/award.svg";
import check from "@/assets/svgs/check.svg";
import danger from "@/assets/svgs/danger.svg";
import earth from "@/assets/svgs/earth.svg";
import location from "@/assets/svgs/location.svg";
import parking from "@/assets/svgs/parking.svg";
import clean from "@/assets/svgs/clean.svg";
import equip from "@/assets/svgs/equip.svg";
import grace from "@/assets/svgs/grace.svg";
import availability from "@/assets/svgs/availity.svg";
import RatingsList from "@/components/Studios/RatingsList";
import { fetchGetApi } from "@/lib/fetchApi";
import StudioRatingButton from "@/components/Studios/StudioRatingButton";

async function getSinglestudio(studioId: string,) {
  return fetchGetApi(`studio/get-studio/${studioId}`);
}
const page = async ({ params }: any) => {
  const response = await getSinglestudio(params.detailsId);
  const avg = response?.data?.averages
  const studioInfo = response?.data?.result
  const detailsDatas = [
    { value: avg?.avgReputation, icon: award, label: "Reputation" },
    { value: avg?.avgLocation, icon: location, label: "Location" },
    { value: avg?.avgParking, icon: parking, label: "Parking" },
    { value: avg?.avgAtmosphere, icon: earth, label: "Atmosphere" },
    { value: avg?.avgValidateParking, icon: check, label: "Validated Parking" },
    { value: avg?.avgAvailability, icon: availability, label: "Availability" },
    { value: avg?.avgCleanliness, icon: clean, label: "Cleanliness" },
    { value: avg?.avgEquipment, icon: equip, label: "Equipment" },
    { value: avg?.avgGracePeriod, icon: grace, label: "Grace Period" },
    { value: avg?.avgShock, icon: award, label: "Socks required" },
  ];
  return (
    <Container className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 xl:grid-cols-11 gap-y-8 lg:gap-y-0 lg:gap-x-10 xl:gap-x-20">
        <div className={"col-span-4 space-y-3 md:pt-5 md:pr-4"}>
          <h3 className="h-fit leading-3 text-4xl md:text-5xl font-semibold lg:font-bold">
            <span className="text-[#00C759]">{response?.data?.averageQuality}</span>
            <span className="text-base font-normal"> /5 </span>
          </h3>
          <div
            className="flex md:justify-between items-end gap-2
           md:gap-5 w-fit min-w-72"
          >
            <h1 className="h-fit font-syne leading-3 text-3xl md:text-4xl lg:font-semibold text-black">
              {studioInfo?.studioName} - {studioInfo?.neighborhood}
            </h1>
          </div>
          <div className="flex gap-2 text-[14px] md:text-base">
            <p>
              <Link
                href={`/trainers?search=${"Thomas"}`}
                className="underline underline-offset-2"
              >
                View All Trainers
              </Link>
            </p>
            <p> ●  {response?.data?.mostFrequentPrice === 5
              ? "$$$$$"
              : response?.data?.mostFrequentPrice === 4
                ? "$$$$"
                : response?.data?.mostFrequentPrice === 3
                  ? "$$$"
                  : response?.data?.mostFrequentPrice === 2
                    ? "$$"
                    : response?.data?.mostFrequentPrice === 1
                      ? "$"
                      : "N/A"}</p>
          </div>
          <div className="flex gap-2 text-[14px] md:text-base">
            <p> ● {studioInfo?.studioCity}</p>
          </div>
          <StudioRatingButton detailsId={response?.data?.result?._id} />
        </div>
        <div className="col-span-3 space-y-6">
          {detailsDatas.slice(0, 4).map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center gap-3"
            >
              <div className="flex justify-start items-center gap-4">
                <Image src={item.icon} alt="" className="h-8 w-8" />
                <span className="text-xl">{item?.label}</span>
              </div>
              <div className="h-8 w-11 flex justify-center items-center text-lg bg-[#FFAE00] font-semibold">
                {item?.value}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center gap-3">
            <span className="text-xl">{detailsDatas[4].label}</span>
            <Image
              src={detailsDatas[4].value ? check : danger}
              alt=""
              className="h-9 w-9 rounded-full mx-1"
            />
          </div>
        </div>
        <div className="col-span-3 space-y-6">
          {detailsDatas.slice(5, 9).map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center gap-3"
            >
              <div className="flex justify-start items-center gap-4">
                <Image src={item.icon} alt="" className="h-8 w-8" />
                <span className="text-xl">{item.label}</span>
              </div>
              <div className="h-8 w-11 flex justify-center items-center text-lg bg-[#FFAE00] font-semibold">
                {item?.value}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center gap-3">
            <span className="text-xl">{detailsDatas[9].label}</span>
            <Image
              src={detailsDatas[9].value ? check : danger}
              alt=""
              className="h-9 w-9 rounded-full mx-1"
            />
          </div>
        </div>
      </div>
      <RatingsList id={params.detailsId} />
    </Container>
  );
};

export default page;
