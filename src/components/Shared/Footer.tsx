import React, { createElement } from "react";
import Container from "../Container";
import Image from "next/image";
import logo from "@/assets/images/white-logo.png";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const links = [
    {
      name: "Email",
      path: "/send-mail",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Terms & Condition",
      path: "/terms-condition",
    },
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
    },
  ];
  const medias = [
    {
      icon: Instagram,
    },
    {
      icon: Facebook,
    },
    {
      icon: Youtube,
    },
  ];
  return (
    <footer className="bg-primary">
      <Container className="flex flex-col xl:flex-row justify-between items-center gap-8 py-14 lg:py-6">
        <div className="flex justify-center xl:justify-start items-center gap-3 w-full">
          <div className="h-10 lg:h-12">
            <Image
              src={logo}
              alt="logo"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-white font-syne text-primary text-xl lg:text-2xl relative">
            R8 My Trainers
            <p className="font-normal text-[7px] md:text-[8px] border border-white rounded-full absolute top-0.5 -right-6 leading-3 p-0.5 h-fit">
              TM
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 justify-center xl:justify-around items-center w-full">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="text-white text-sm lg:text-base"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-6">
          {medias.map((item, index) => (
            <a key={index} className="text-primary bg-white p-2 rounded-full">
              {createElement(item.icon, {
                size: "22",
              })}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
