"use client";

import React, { useEffect, useRef, useState } from "react";
import { TUniObject } from "@/types";
import Link from "next/link";
import { Button } from "antd";
import { cn } from "@/utils/cn";
import { PiArrowBendDoubleUpLeftDuotone } from "react-icons/pi";
import { usePathname } from "next/navigation";

const PoliciesOpitions = ({
  sitePolicies,
  className,
}: {
  sitePolicies: TUniObject;
  className?: string;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // profile menu popup
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div
      ref={profileMenuRef}
      className={cn(
        "fixed lg:static right-0 top-16 bg-white translate-x-64 lg:translate-x-0 transition-all drop-shadow-xl lg:drop-shadow-none mt-2",
        className,
        { "translate-x-0": open }
      )}
    >
      <div className=" flex flex-col pl-6 py-5 lg:py-0">
        <h2 className="font-medium pb-0.5">{sitePolicies.title}</h2>
        {sitePolicies.items.map((item: TUniObject, index: number) => (
          <div key={index} className="flex items-center gap-0.5">
            <p className="text-sm text-secondery">0{++index}.</p>
            <Link href={item.link}>
              <Button size="small" type="text">
                {item.title}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => setOpen((c) => !c)}
        // onBlur={() => setOpen(false)}
        className="fixed lg:hidden top-20 -left-9 bg-white/90 border border-gray-200 rounded-s-lg px-1 py-1.5 shadow-lg outline-0"
      >
        <PiArrowBendDoubleUpLeftDuotone size={25} />
      </button>
    </div>
  );
};

export default PoliciesOpitions;
