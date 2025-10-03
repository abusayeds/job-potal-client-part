import React from "react";
import { TLayoutProps } from "@/types";
import Container from "@/components/Container";
import PoliciesHeader from "@/components/SitePolicies/PoliciesHeader";
import PoliciesOpitions from "@/components/SitePolicies/PoliciesOpitions";

const Layout = ({ children }: TLayoutProps) => {
  const sitePolicies = {
    title: "Legal Information",
    items: [
      { id: 1, title: "Terms of Use", link: "/terms" },
      { id: 2, title: "Disclaimer", link: "/disclaimer" },
      { id: 3, title: "Refund & Cancellation Policy", link: "/refund" },
      { id: 4, title: "Privacy Policy", link: "/privacy" },
    ],
  };
  return (
    <>
      <PoliciesHeader items={sitePolicies.items} />
      <Container mClassName="py-6 lg:py-6 xl:py-6 relative flex gap-6 overflow-hidden">
        <div className="flex-1 w-full min-h-[75vh]">{children}</div>
        <PoliciesOpitions sitePolicies={sitePolicies} className="w-64 h-fit border-s border-gray-300 "/>
      </Container>
    </>
  );
};

export default Layout;
