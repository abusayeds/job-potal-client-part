import React from "react";
import { Button } from "../ui/button";
import ReportButton from "../SubComponent/ReportButton";
import award from "@/assets/svgs/award.svg";
import check from "@/assets/svgs/check.svg";
import danger from "@/assets/svgs/danger.svg";
import earth from "@/assets/svgs/earth.svg";
import location from "@/assets/svgs/location.svg";
import parking from "@/assets/svgs/parking.svg";
import avaibility from "@/assets/svgs/availity.svg";
import clean from "@/assets/svgs/clean.svg";
import equip from "@/assets/svgs/equip.svg";
import grace from "@/assets/svgs/grace.svg";
import Image from "next/image";
import { fetchGetApi } from "@/lib/fetchApi";

async function getStudios(studioId : string) {
  try {
    const response = await fetchGetApi(`studio/get-studio-reviews/${studioId}`);
    return response?.data || [];
  } catch (error) {
       console.log(error)
    // console.error("Error fetching studio reviews:", error);
    return [];
  }
}

const RatingsList = async ({ id } : any) => {
  const reviewResponse = await getStudios(id);
  if (!reviewResponse.length) {
    return <div>No reviews available.</div>;
  }
  return (
    <div>
      <h5 className="underline underline-offset-8">{reviewResponse.length} Ratings</h5>
      <div className="h-[1.3px] w-full bg-[#B7B4FB] mt-5" />
      <div className="space-y-5 mt-10 max-w-6xl">
        {reviewResponse.map((review : any, ) => (
          <div
            key={review?._id}
            className="space-y-5 border-2 border-[#B7B4FB] rounded-lg px-5 lg:px-7 py-8 bg-foreground"
          >
            <div className="flex justify-between">
              <h5 className="font-semibold text-sm">
                {new Date(review.createdAt).toLocaleDateString()}
              </h5>
              <ReportButton id={review?._id} />
            </div>
            <div className="flex flex-col lg:flex-row justify-start gap-6 lg:gap-10 xl:gap-16 lg:pr-4">
              <div className="space-y-3 text-center w-fit">
                <h5 className="uppercase text-sm font-semibold">Quality</h5>
                <div className="h-16 w-20 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
                  {parseFloat(review.quality).toFixed(1)}
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-6 lg:gap-10 xl:gap-16">
                <div className="col-span-3 md:col-span-1 space-y-4">
                  <ReviewDetail label="Reputation" value={review?.reputation} icon={award} />
                  <ReviewDetail label="Location" value={review?.location} icon={location} />
                  <ReviewDetail label="Parking" value={review?.parking} icon={parking} />
                  <ReviewDetail label="Atmosphere" value={review?.atmosphere} icon={earth} />
                </div>
                <div className="col-span-3 md:col-span-1 space-y-4">
                  <ReviewDetail label="Availability" value={review?.availability} icon={avaibility} />
                  <ReviewDetail label="Cleanliness" value={review?.cleanliness} icon={clean} />
                  <ReviewDetail label="Equipment" value={review?.equipment} icon={equip} />
                  <ReviewDetail label="Grace Period" value={review?.gracePeriod} icon={grace} />
                </div>
                <div className="col-span-3 md:col-span-1 space-y-4">
                  <BooleanReviewDetail
                    label="Validated Parking"
                    value={review?.validateParking}
                    icon={review?.validateParking ? check : danger}
                  />
                  <BooleanReviewDetail
                    label="Socks Required"
                    value={review?.socks}
                    icon={review?.socks ? check : danger}
                  />
                  <PriceReviewDetail label="Price" value={review?.price} />
                </div>
                <div className="col-span-3">
                  <p className="mt-4 text-gray-700">{review?.writeReview}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-8 lg:py-10 max-w-6xl">
        <Button
          className="rounded-full uppercase tracking-wider"
          variant={"default"}
          size={"lg"}
        >
          Show More
        </Button>
      </div>
    </div>
  );
};
const ReviewDetail = ({ label, value, icon } : any) => (
  <div className="flex justify-between items-center gap-3">
    <div className="flex justify-start items-center gap-4">
      <Image src={icon} alt={`${label} icon`} className="h-6 w-6" />
      <span className="text-base">{label}</span>
    </div>
    <div className="h-6 w-9 flex justify-center items-center bg-[#FFAE00] font-semibold">
      {value.toFixed(1)}
    </div>
  </div>
);

const BooleanReviewDetail = ({ label,  icon } : any) => (
  <div className="flex justify-between items-center gap-3">
    <span className="text-base">{label}</span>
    <Image src={icon} alt={`${label} icon`} className="h-7 w-7 rounded-full mx-1" />
  </div>
);

const PriceReviewDetail = ({ label, value } : any) => (
  <div className="flex justify-between items-center gap-3">
    <span className="text-base">{label}</span>
    <div className="h-6 w-20 flex  justify-end items-end font-semibold mx-1">
      {value >= 1 && value <= 5 ? '$'.repeat(value) : 'N/A'}
    </div>
  </div>
);


export default RatingsList;
