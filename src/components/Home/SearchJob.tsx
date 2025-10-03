import Image from "next/image";
import Container from "../Container";
import SectionHeading from "../ui/SectionHeading";
import { Button } from "antd";
import Link from "next/link";

const SearchJob = () => {
  return (
    <div className="bg-[#2F3541] container mx-auto 2xl:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        <Container className="col-span-5 px-6 xl:px-8 min-h-[300px] lg:min-h-[400px] flex items-center">
          <div className="text-white space-y-5">
            <SectionHeading title="Create A Better Future For Yourself" />
            <p className="line-clamp-1">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
              Blandit a massa elementum id scelerisque rhoncus . Lectus dolor
              blandit massa pretium id ultrices phasellus tortor. Risus risus
              lectus augue justo lacus viverra sit. Ultricies purus dolor
              viverra mi laoreet at cursus justo. Ultrices purus diam egestas
              amet faucibus tempor blandit. Elit velit mauris aliquam est diam.
              Leo sagittis consectetur diam morbi erat aenean. Vulputate
              praesent congue faucibus in euismod feugiat euismod volutpat.
              Adipiscing risus amet phasellus imperdiet eget vel pulvinar. Risus
              in felis faucibus sit. Scelerisque consequat iaculis mauris amet
              vel felis id tincidunt nunc.
            </p>
            <Link href={"/find-job"}>
              <Button type="primary" size="large">
                Find Job
              </Button>
            </Link>
          </div>
        </Container>
        <div className="relative col-span-7 h-full">
          <Image
            src="/images/job-search.svg"
            alt="banner"
            width={1000}
            height={1000}
            // fill
            // sizes="100vw"
            // style={{
            //   objectFit: "contain",
            //   // zIndex: -1,
            // }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchJob;
