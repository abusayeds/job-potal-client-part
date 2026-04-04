"use client";

import { Drawer } from "antd";
import { TRole } from "@/types";
import { cn } from "@/utils/cn";
import React, { createElement, useEffect, useState } from "react";
import { PiArrowBendDoubleUpLeftDuotone } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { generateLink } from "@/lib/generateLink";
import { dashboardItems } from "@/constants/router.const";
import { getRoleLabel } from "@/lib/getRoleLabel";

const PhoneOpitions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <Drawer
        title={`${getRoleLabel(user?.role as TRole)} Dashboard`}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={300}
      >
        {generateLink(dashboardItems, user?.role as TRole).map(
          ({ name, icon, path }, indx) => (
            <button
              onClick={() => router.push(`/${path as string}`)}
              key={indx}
              className={cn(
                " text-primary w-full pl-4 pr-6 py-3 flex items-center justify-start gap-3 text-lg transition-all font-medium hover:bg-[#FCECEC]",
                {
                  " relative before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-r-xs before:bg-primary bg-[#FCECEC]":
                    pathname.includes(path as string),
                }
              )}
            >
              {createElement(icon, { size: "20" })}
              <span>{name}</span>
            </button>
          )
        )}
      </Drawer>
      <button
        title="Dashboard Items"
        onClick={showDrawer}
        // onBlur={() => setOpen(false)}
        className="fixed lg:hidden top-24 right-0 bg-white/90 border border-gray-200 rounded-s-lg px-1 py-1.5 shadow-lg outline-0"
      >
        <PiArrowBendDoubleUpLeftDuotone size={25} />
      </button>
    </>
  );
};

export default PhoneOpitions;
