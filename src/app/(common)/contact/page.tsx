import Container from "@/components/Container";
import BecomeUser from "@/components/Home/BecomeUser";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSupportInfo } from "@/services/settings";
import { Button } from "antd";

const page = async () => {
  const supportData = await getSupportInfo();
  return (
    <>
      <Container
        className="bg-lightgray"
        mClassName="py-3 lg:py-4 xl:py-5 flex justify-between items-center"
      >
        <p className="sm:text-lg">Contact Us</p>
        <p className="text-sm">
          <span className="text-brand/60">Home</span> / Contact Us
        </p>
      </Container>
      <Container mClassName="space-y-5">
        {/* <p className="text-primary">Who we are</p> */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-x-5 gap-y-10">
          <div className="col-span-1 lg:col-span-6 space-y-2 lg:space-y-4">
            <SectionHeading className="max-w-2xl font-roman">
              We prioritize customer service and continuously refine key
              strategies to enhance interactions and satisfaction.
            </SectionHeading>
            <p className="max-w-3xl lg:text-2xl text-brand/60">
              Want to chat? We’d love to hear from you! Get in touch with our
              Customer Service Team to inquire about speaking events,
              advertising rates, or just say hello.
            </p>
            <Button
              href={`mailto:${supportData?.data?.value?.email ?? "N/A"}`}
              target="_blank"
              size="large"
              type="primary"
            >
              Email Support
            </Button>
          </div>
          <div className="col-span-1 lg:col-span-5 w-full drop-shadow-xl">
            <ContactForm />
          </div>
        </div>
      </Container>
      <BecomeUser />
    </>
  );
};

export default page;
