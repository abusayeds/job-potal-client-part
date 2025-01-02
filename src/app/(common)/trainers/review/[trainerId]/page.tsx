"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import RatingInput from "@/components/SubComponent/RatingInput";
import YesNoInput from "@/components/SubComponent/YesNoInput";
import TagSelectInput from "@/components/Trainers/TagSelectInput";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/lib/BASE _URL";
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";

const Page = () => {
  const [reviewData, setReviewData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [trainerInfo, setTrainerInfo] = useState<any>();
  const params = useParams();
  const trainerId = params?.trainerId;

  useEffect(() => {
    const fetchTrainer = async () => {
      const res = await fetch(`${BASE_URL}trainer/get-trainer/${trainerId}`);
      const data = await res.json();
      setTrainerInfo(data?.data?.data);
    };

    fetchTrainer();
  }, [trainerId]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (reviewData.takeClass === undefined || reviewData.takeClass === null) {
      newErrors.takeClass = "Please indicate if you'd take another class.";
    }

    if (reviewData.freeClass === undefined || reviewData.freeClass === null) {
      newErrors.freeClass = "Please indicate if this was a free class.";
    }

    if (!reviewData.trainerRate) {
      newErrors.trainerRate = "Trainer rate is required.";
    }

    if (!reviewData.diffcultTrainer) {
      newErrors.diffcultTrainer = "Difficulty rating is required.";
    }

    if (!reviewData.musicChoice) {
      newErrors.musicChoice = "Music choice rating is required.";
    }

    if (!reviewData.tags || reviewData.tags.length === 0) {
      newErrors.tags = "Please select up to 3 tags.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...reviewData,
      trainerId: trainerId,
    };
    const response = await fetchPostApi(`trainer-review/create-trainer-review`, data);
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
              {trainerInfo?.firstName} {trainerInfo?.lastName}
            </h1>
            <div className="space-y-2 text-[14px] md:text-base">
              <p>
                Trainer at{" "}
                <Link
                  href={`/studios?search=${"Neighborhood"}`}
                  className="underline underline-offset-2"
                >
                  {trainerInfo?.studioName} - {trainerInfo?.neighborhood}
                </Link>
              </p>
              <p>Training Type: {trainerInfo?.trainingType}</p>
            </div>
          </div>
        </Container>
      </div>
      <Container className="space-y-5 lg:space-y-6 mb-10 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-12 md:px-4">
          <div className="col-span-9">
            <form
              onSubmit={onSubmit}
              className="space-y-5 lg:space-y-7 w-full max-w-4xl mx-auto p-4 sm:p-8"
            >
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput
                  fieldName="trainerRate"
                  label={"Rate your trainer*"}
                  setReviewData={setReviewData}
                />
                {errors.trainerRate && <p className="text-red-500">{errors.trainerRate}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput
                  fieldName="diffcultTrainer"
                  label={"How difficult was this trainer?*"}
                  setReviewData={setReviewData}
                />
                {errors.diffcultTrainer && <p className="text-red-500">{errors.diffcultTrainer}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <YesNoInput
                  fieldName="takeClass"
                  label={"Would you take a class with this trainer again?*"}
                  setReviewData={setReviewData}
                />
                {errors.takeClass && <p className="text-red-500">{errors.takeClass}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <YesNoInput
                  fieldName="freeClass"
                  label={"Was this a free class?*"}
                  setReviewData={setReviewData}
                />
                {errors.freeClass && <p className="text-red-500">{errors.freeClass}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <RatingInput
                  fieldName="musicChoice"
                  label={"How was the trainers music choice?*"}
                  setReviewData={setReviewData}
                />
                {errors.musicChoice && <p className="text-red-500">{errors.musicChoice}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md">
                <TagSelectInput
                  fieldName="tags"
                  label={"Select up to 3 tags*"}
                  setReviewData={setReviewData}
                />
                {errors.tags && <p className="text-red-500">{errors.tags}</p>}
              </div>
              <div className="rounded-lg p-4 lg:p-6 border border-gray-100 shadow-md space-y-4">
                <p className="text-base lg:text-lg text-black">Write a Review (Optional)</p>
                <div className="w-full gap-1.5">
                  <p className="text-gray-400">
                    Discuss the trainer&apos;s professional abilities, teaching style, and ability to teach the class.
                  </p>
                  <Textarea
                    className=""
                    placeholder="Type here...."
                    rows={7}
                    onChange={(e) => setReviewData({ ...reviewData, reviewText: e.target.value })}
                  />
                </div>
              </div>
              <div className="py-5 md:py-8 flex justify-center">
                <Button
                  size={"lg"}
                  className="w-fit md:w-full max-w-sm rounded-full py-6 uppercase bg-[#00A838]"
                  variant={"default"}
                  type="submit"
                >
                  Submit Trainer Rating
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
