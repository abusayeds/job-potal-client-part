import React from "react";
import Container from "@/components/Container";
import Details from "@/components/Trainers/Details";
import RatingProggress from "@/components/Trainers/RatingProggress";
import RatingsList from "@/components/Trainers/RatingsList";
import { fetchGetApi } from "@/lib/fetchApi";
export type TProps = { params: Promise<{ trainerId: string }> };
async function getStudios(trainerId: string, ) {
  return fetchGetApi(`trainer/get-trainer/${trainerId}`);
}
const page = async ({ params }: TProps) => {
  const { trainerId } = await params;
  const trainerResponse = await getStudios( trainerId ); 
   const queryParams = [
      { name: "trainingType", value: trainerResponse?.data?.data?.trainingType },
      { name: "limit", value: 3 },
    ];
  const SimilarTrainers = await fetchGetApi("trainer/trainers?limit=3", queryParams, )
  return (
    <Container className="space-y-7">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
        <div className="col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-2 lg:gap-12 xl:gap-16">
            <Details trainer= {trainerResponse?.data?.data} className="col-span-6 lg:col-span-5" />
            <RatingProggress trainer= {trainerResponse?.data?.data?.rating}  className="col-span-6 lg:col-span-7" />
          </div>
          <div className="w-full md:max-w-3xl lg:max-w-4xl lg:mx-auto py-10 md:py-20 space-y-4 md:space-y-6 ">
            <h3 className="text-xl md:text-2xl font-medium text-black text-center md:text-left">
              Check Out Similar Trainers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SimilarTrainers?.data?.trainers?.slice(0, 3).map((item : any, index : number) => (
                <div
                  key={index}
                  className="px-4 py-5 bg-[#E8E7FE] w-full flex justify-start items-center  gap-3 rounded-md"
                >
                  <p className="text-lg font-medium px-2 py-0.5 bg-[#00C759] rounded-sm w-fit">
                    {item?.overallRating}
                  </p>
                  <p>{item?.firstName}{item.lastName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 h-full hidden lg:flex flex-col justify-around">
          <div className="bg-[#F7F7F7] rounded-sm h-52">
            <h1 className="bg-white w-full text-center">Advertisement</h1>
          </div>
          <div className="bg-[#F7F7F7] rounded-sm h-52">
            <h1 className="bg-white w-full text-center">Advertisement</h1>
          </div>
        </div>
      </div>
      <RatingsList id = {trainerId} />
    </Container>
  );
};

export default page;
