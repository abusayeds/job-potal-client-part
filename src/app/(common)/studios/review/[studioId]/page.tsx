"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import RatingInput from "@/components/SubComponent/RatingInput";
import YesNoInput from "@/components/SubComponent/YesNoInput";
import { Textarea } from "@/components/ui/textarea";
import PriceRatingInput from "@/components/SubComponent/PriceRatingInput";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/lib/BASE _URL";
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";

const Page = () => {
  const params = useParams();
  const { studioId } = params;
  const [studioInfo, setStudioInfo] = useState<any>();
  const [reviewData, setReviewData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validateInput = (data: { [key: string]: any }) => {
    const errors: { [key: string]: string } = {};
    if (!studioId) errors.studioId = "Studio ID is required!";
    if (!Number.isInteger(data.reputation) || data.reputation < 1 || data.reputation > 5)
      errors.reputation = "Reputation must be an integer between 1 and 5.";
    if (!Number.isInteger(data.price) || data.price < 1 || data.price > 5)
      errors.price = "Price must be an integer between 1 and 5.";
    if (!Number.isInteger(data.location) || data.location < 1 || data.location > 5)
      errors.location = "Location must be an integer between 1 and 5.";
    if (!Number.isInteger(data.parking) || data.parking < 1 || data.parking > 5)
      errors.parking = "Parking must be an integer between 1 and 5.";
    if (typeof data.socks !== "boolean")
      errors.required = "Socks field must be a boolean.";
    if (typeof data.validateParking !== "boolean")
      errors.validatedParking = "Validated Parking field must be a boolean.";
    if (!Number.isInteger(data.atmosphere) || data.atmosphere < 1 || data.atmosphere > 5)
      errors.atmosphere = "Atmosphere must be an integer between 1 and 5.";
    if (!Number.isInteger(data.availability) || data.availability < 1 || data.availability > 5)
      errors.availability = "Availability must be an integer between 1 and 5.";
    if (!Number.isInteger(data.cleanliness) || data.cleanliness < 1 || data.cleanliness > 5)
      errors.cleanliness = "Cleanliness must be an integer between 1 and 5.";
    if (!Number.isInteger(data.equipment) || data.equipment < 1 || data.equipment > 5)
      errors.equipment = "Equipment must be an integer between 1 and 5.";
    if (!Number.isInteger(data.gracePeriod) || data.beingLate < 1 || data.beingLate > 5)
      errors.beingLate = "Grace period must be an integer between 1 and 5.";
    return errors;
  };
  useEffect(() => {
    const fetchTrainer = async () => {
      const res = await fetch(`${BASE_URL}studio/get-studio/${studioId}`);
      const data = await res.json();
      setStudioInfo(data?.data?.result);
    };
    fetchTrainer();
  }, [studioId]);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateInput({ ...reviewData, });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const data = {
      ...reviewData,
      studioId: studioId
    }
    const response = await fetchPostApi(`studio-review/create-review`, data);
    if (response?.success === true) {
      await Swal.fire({
        icon: "success",
        title: "Report Submitted",
        text: "Your Review has been successfully submitted. Thank you!",
        confirmButtonText: "OK",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          response?.message ||
          "There was an issue submitting your Review. Please try again later.",
        confirmButtonText: "OK",
      });
      Swal.close();
    }
};
  return (
    <div>
      <div className="shadow-md">
        <Container className="flex gap-2">
          <h1 className="text-2xl md:text-3xl text-black pt-0.5">Rate:</h1>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:font-semibold text-black">
              {studioInfo?.studioName} - {studioInfo?.neighborhood}
            </h1>
            <div className="space-y-2 text-[14px] md:text-base">
              <p>{studioInfo?.studioCity}</p>
            </div>
          </div>
        </Container>
      </div>
      <Container className="space-y-5 lg:space-y-6 mb-10 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-12 md:px-4">
          <div className="col-span-9">
            <form onSubmit={onSubmit} className="space-y-5 lg:space-y-7 w-full max-w-4xl mx-auto p-4 sm:p-8">
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="reputation" label="Reputation*" setReviewData={setReviewData} />
                {errors.reputation && <p className="text-red-500">{errors.reputation}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <PriceRatingInput fieldName="price" label="Price*" setReviewData={setReviewData} />
                {errors.price && <p className="text-red-500">{errors.price}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="location" label="Location*" setReviewData={setReviewData} />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="parking" label="How is parking?*" setReviewData={setReviewData} />
                {errors.parking && <p className="text-red-500">{errors.parking}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <YesNoInput fieldName="socks" label="Are socks required?*" setReviewData={setReviewData} />
                {errors.required && <p className="text-red-500">{errors.required}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <YesNoInput fieldName="validateParking" label="Is there free/validated parking?*" setReviewData={setReviewData} />
                {errors.validatedParking && <p className="text-red-500">{errors.validatedParking}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="atmosphere" label="Atmosphere*" setReviewData={setReviewData} />
                {errors.atmosphere && <p className="text-red-500">{errors.atmosphere}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="availability" label="Class Schedule/Availability*" setReviewData={setReviewData} />
                {errors.availability && <p className="text-red-500">{errors.availability}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="cleanliness" label="Cleanliness*" setReviewData={setReviewData} />
                {errors.cleanliness && <p className="text-red-500">{errors.cleanliness}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="equipment" label="Equipment*" setReviewData={setReviewData} />
                {errors.equipment && <p className="text-red-500">{errors.equipment}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput fieldName="gracePeriod" label="How strict is it about being late?*" setReviewData={setReviewData} />
                {errors.beingLate && <p className="text-red-500">{errors.beingLate}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md space-y-4">
                <p className="text-base lg:text-lg text-black">Write a Review</p>
                <div className="w-full gap-1.5">
                  <p className="text-gray-400">
                    Discuss the trainer&apos;s professional abilities including teaching style and ability to teach the class.
                  </p>
                  <Textarea
                    placeholder="Type here...."
                    rows={7}
                    onChange={(e) => setReviewData({ ...reviewData, writeReview: e.target.value })}
                  />
                </div>
              </div>
              <div className="py-5 md:py-8 flex justify-center">
                <Button
                  size="lg"
                  className="w-fit md:w-full max-w-sm rounded-full py-6 uppercase bg-[#00A838]"
                  variant="default"
                  type="submit"
                >
                  Submit Studio Rating
                </Button>
              </div>
            </form>
          </div>
          <div className="col-span-3 h-full hidden md:flex flex-col justify-start gap-20 pt-8">
            <div className="bg-[#F7F7F7] rounded-sm h-52">
              <h1 className="bg-white w-full text-center">Advertisement</h1>
            </div>
            <div className="bg-[#F7F7F7] rounded-sm h-52">
              <h1 className="bg-white w-full text-center">Advertisement</h1>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
