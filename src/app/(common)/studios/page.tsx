import React from "react";
import Container from "@/components/Container";
import ResultEmpty from "@/components/SubComponent/ResultEmpty";
import Link from "next/link";
import { fetchGetApi } from "@/lib/fetchApi";
async function getStudios(searchTerm: string, ) {
  return fetchGetApi(`studio/get-studios?searchTerm=${searchTerm}`);
}
type SearchParams = Promise<{ [key: string]: string }>;
const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { search: searchValue } = await searchParams;
  const studiosResponse = await getStudios( searchValue ); 
  const studios = studiosResponse?.data?.studios
  return (
    <Container>
      {studios?.length ? (
        <>
          <div className="pt-8 pb-12  border-b text-sm mb-8">
            <span className="font-semibold italic">{studios?.length}</span>{" "}
            sdudios with{" "}
            <span className="font-semibold italic">“ {searchValue} ”</span> in
            their name.
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
            <div className="col-span-9">
              <div className="w-full flex flex-col gap-5">
                {studios.map((item: any, index : number) => (
                  <Link href={`/studios/${item?._id}`} key={index}>
                    <div className="flex justify-start items-center gap-4 lg:gap-6 border-2 border-[#B7B4FB] px-4 py-3 md:py-6 md:px-8 rounded-lg">
                      <div className="space-y-2 text-center">
                        <h5 className="uppercase text-sm font-semibold">
                          Overall
                        </h5>
                        <div className="h-16 w-20 lg:h-20 lg:w-24 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
                          {item?.overallQuality}
                        </div>
                        <p className="text-xs">{item?.reviewCount} Total review</p>
                      </div>
                      <div className="space-y-1">
                        <h1 className="text-xl lg:text-2xl font-medium">
                          {item?.studioName}
                        </h1>
                        <p>Training Type: New Training</p>
                        <p className="text-sm">{item?.studioCity}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-1 justify-center py-8 lg:py-10 max-w-56 mx-auto text-center">
                {/* <Button
                  className="w-fit block mx-auto rounded-full uppercase tracking-wider"
                  variant={"default"}
                  size={"lg"}
                >
                  Show More
                </Button> */}
                <p className="text-sm pt-2">
                  Don’t see the Studio you’re looking for?
                </p>
                <Link
                  href={`/studios/add`}
                  className="underline underline-offset-2 text-sm"
                >
                  Add a Studio
                </Link>
              </div>
            </div>
            <div className="col-span-3 h-full hidden lg:flex flex-col justify-start gap-8">
              <div className="bg-[#F7F7F7] rounded-sm h-52">
                <h1 className="bg-white w-full text-center">Advertisement</h1>
              </div>
              <div className="bg-[#F7F7F7] rounded-sm h-52">
                <h1 className="bg-white w-full text-center">Advertisement</h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ResultEmpty title="Studio" forword="/studios/add" />
      )}
    </Container>
  );
};

export default Page;


