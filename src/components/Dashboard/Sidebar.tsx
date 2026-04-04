"use client";

import React, { createElement, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TRole } from "@/types";
import { generateLink } from "@/lib/generateLink";
import { dashboardItems } from "@/constants/router.const";
import { cn } from "@/utils/cn";
import Swal from "sweetalert2";
import { getRoleLabel } from "@/lib/getRoleLabel";
import { logout } from "@/redux/features/auth/authSlice";

const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogOut = () => {
    Swal.fire({
      html: `
        <div class="text-center pt-5">
            Are you sure you want to logout?
        </div>
      `,
      // text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Logout     ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logout());
        //   localStorage.clear();
        router.replace("/");
      }
    });
  };
  useEffect(() => {
    if (
      (user?.role === "employer" || user?.role === "candidate") &&
      !user.isCompleted
    ) {
      router.push(`/settings`);
    }
  }, []);
  return (
    <div className={cn("py-6 drop-shadow-sm sticky top-20 left-0 ", className)}>
      <div className="flex flex-col justify-between gap-2 lg:min-h-[calc(100vh-180px)] pr-3">
        <div>
          <p className="text-center text-sm pb-1.5 pt-1 uppercase">
            {getRoleLabel(user?.role as TRole)} dashboard
          </p>
          <div className="space-y-2">
            {generateLink(dashboardItems, user?.role as TRole).map(
              ({ name, icon, path }, indx) => (
                <button
                  onClick={() => router.push(`/${path as string}`)}
                  key={indx}
                  className={cn(
                    " text-primary w-full pl-6 pr-4 py-3 flex items-center justify-start gap-3 text-lg transition-all font-medium hover:bg-[#FCECEC]",
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
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="bg-light-gray/20 w-full pl-6 pr-4 py-3 flex items-center justify-start gap-3 text-lg outline-none font-medium text-[#373643] bg-[#FCECEC]"
        >
          <RiLogoutCircleRLine className="text-red-400" size={20} />
          <span>Log-out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
