import React from "react";
import Container from "@/components/Container";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import TrainingCard from "@/components/Training/TrainingCard";
import TrainingSearch from "@/components/Training/TrainingSearch";
import PaginationComp from "@/components/ui/PaginationComp";
import { trainingsSearch } from "@/services/training";
import { TPageProps, TQuery } from "@/types";
import { TTraining } from "@/types/training.type";
import { Divider } from "antd";

const page = async (props: TPageProps) => {
  const params = await props.searchParams;
  const data = await trainingsSearch(params);
  return (
    <div>
      <Container
        // className="bg-lightgray hidden lg:block"
        mClassName="py-3 lg:py-4 xl:py-5"
      >
        <TrainingSearch path="/training" />
      </Container>
      <Container className="" mClassName="py-0 lg:py-0 xl:py-0">
        <Divider size="large">
          <span className="text-xl lg:text-4xl">Trainings</span>
        </Divider>
      </Container>
      <Container className="" mClassName="pt-0 lg:pt-0 xl:pt-0">
        <LoaderWraperComp
          isLoading={false}
          isError={!data.success}
          error={data}
          dataEmpty={data?.data?.trainings?.length === 0}
        >
          <div className="space-y-7 py-5">
            {data?.data?.trainings?.map(
              (training: TTraining, index: number) => (
                <TrainingCard data={training} key={index} />
              )
            )}
          </div>
        </LoaderWraperComp>
        <PaginationComp
          totalData={data?.data?.pagination?.totalData}
          showSizeChanger={false}
        />
      </Container>
    </div>
  );
};

export default page;
