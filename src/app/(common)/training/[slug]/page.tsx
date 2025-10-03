import React from "react";
import TrainingDetails from "@/components/Training/TrainingDetails";
import { TPageProps } from "@/types";
import { trainingDetails } from "@/services/training";
import Container from "@/components/Container";
import LoaderWraperComp from "@/components/LoaderWraperComp";

const page = async (props: TPageProps) => {
  const { slug } = await props.params;
  const data = await trainingDetails(slug);
  return (
    <div>
      {/* <Container
        className="bg-lightgray hidden lg:block"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">Training Details</p>
        <p className="text-sm">
          <span className="text-brand/60">Home / Trainings </span>/ Training
          Details
        </p>
      </Container> */}
      <Container>
        <LoaderWraperComp
          isError={!data?.success}
          error={data}
          isLoading={false}
        >
          <TrainingDetails data={data?.data} />
        </LoaderWraperComp>
      </Container>
    </div>
  );
};

export default page;
