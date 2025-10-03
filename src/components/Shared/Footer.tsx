import { getSupportInfo } from "@/services/settings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const supportData = await getSupportInfo();
  const footerSections = [
    {
      title: "Quick Link",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Contact", href: "/contact", hasArrow: true },
      ],
    },
    {
      title: "Job Seekers",
      links: [
        { label: "Apply Jobs", href: "/find-job" },
        { label: "Resume Writing", href: "/resume-writing" },
        { label: "Job Interview", href: "/interview" },
        { label: "Training", href: "/training" },
        // { label: "Browse Employers", href: "/employers" },
        // { label: "Dashboard", href: "/overview" },
        // { label: "Saved Jobs", href: "/favorite-jobs" },
      ],
    },
    {
      title: "Employers",
      links: [
        { label: "Post a Job", href: "/job-post" },
        { label: "Pricing", href: "/plan-bills/subscriptions" },
        {
          label: `Call now: +${supportData?.data?.value?.phone ?? "N/A"}`,
          href: `tel:+${supportData?.data?.value?.phone ?? "N/A"}`,
        },
        {
          label: `Email: ${supportData?.data?.value?.email ?? "N/A"}`,
          href: `mailto:${supportData?.data?.value?.email ?? "N/A"}`,
        },
        // { label: "Browse Job seekers", href: "/job-seekers" },
        // { label: "Employer Dashboard", href: "/overview" },
        // { label: "Applications", href: "/our-jobs" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Refund & Cancellation Policy", href: "/refund" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];
  return (
    <footer className="bg-[#002710]">
      <div className="container mx-auto px-2 lg:px-4 py-12 lg:py-16 xl:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-8">
          <div className="space-y-3 text-sm text-center md:text-start flex justify-center">
            <div className="relative w-full max-w-36 lg:max-w-40 aspect-[4/1] mx-auto md:mx-0 md:-mt-2 z-0">
              <Link href={`/`}>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                />
              </Link>
            </div>
            {/* <div>
              <span className="text-gray-400">Call now: </span>
              <span className="text-gray-300">(+234) 555-0115</span>
            </div>
            <div>
              <span className="text-gray-400">Email: </span>
              <span className="text-gray-300">{"admin@gmail.com"}</span>
            </div> */}
            {/* <div className="text-gray-400 text-xs leading-relaxed">
              PO Box 907251
              <br />
              Gainesville, GA 30501
              <br />
              United States
            </div> */}
          </div>

          {/* Footer Links - Each section takes 1 column */}
          {footerSections.map((section, index) => (
            <div key={index} className="text-center">
              <h3 className="text-white font-semibold text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex justify-center items-center group"
                    >
                      {/* {link.hasArrow && (
                        <BsArrowRight className="w-3 h-3 mr-2 opacity-70" />
                      )} */}
                      <span className="group-hover:underline">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-5 xl:col-span-1 flex items-center justify-center xl:justify-end relative">
            <Image
              src={"/images/footer-map.svg"}
              alt="map"
              width={1000}
              height={1000}
              // fill
              // style={{ objectFit: "contain" }}
              // sizes="100vw"
              className=" max-w-40"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#18191C] py-3 sm:py-5 text-center text-xs sm:text-sm text-white/70 border-t border-white/20">
        @ 2025 Remotisjobs. All rights Rserved
      </div>
    </footer>
  );
};

export default Footer;
