"use client";

import React, { createElement, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TRole } from "@/types";
import { generateLink } from "@/lib/generateLink";
import { adminDashboardItems } from "@/constants/router.const";
import { cn } from "@/utils/cn";
import Swal from "sweetalert2";
import { logout } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowRight } from "react-icons/md";

const AdminSidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [openNome, setOpenNome] = useState<{ name: string | null }>({
    name: null,
  });

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
        router.replace("/sign-in");
      }
    });
  };
  // useEffect(() => {

  // }, [pathname]);
  // console.log(generateLink(adminDashboardItems, user?.role as TRole));
  return (
    <div className={cn("drop-shadow-sm ", className)}>
      <div className="flex flex-col justify-between gap-2 h-screen py-2 w-60 xl:w-72 ">
        <div className="pt-6">
          <div className="relative w-full h-full max-h-16 xl:max-h-20 aspect-[4/1]">
            <Link href={`/`}>
              <Image
                src="/images/R-logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
                // className="h-full"
              />
            </Link>
          </div>
          <div className="h-[1px] w-[95%] bg-[#8CC6A7] mt-5 mb-3 mx-auto" />
          <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pb-1.5">
            {generateLink(adminDashboardItems, user?.role as TRole).map(
              ({ name, icon, path, children, rootPath }, indx) =>
                children ? (
                  <div key={indx} className="overflow-hidden">
                    <button
                      onClick={() => {
                        setOpenNome((c) => ({
                          name: c?.name === name ? null : name,
                        }));
                      }}
                      className={cn(
                        "outline-none text-white w-full pl-6 pr-3 py-3 flex items-center justify-between gap-3 text-lg transition-all font-medium group",
                        {
                          "text-primary relative before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-r-xs before:bg-primary bg-[#FCECEC]":
                            name !== openNome?.name &&
                            pathname.includes(rootPath as string) &&
                            openNome.name,
                        }
                      )}
                    >
                      <div className="flex items-center justify-start gap-3 text-inherit">
                        <div>{createElement(icon, { size: "20" })}</div>
                        <span>{name}</span>
                      </div>
                      <MdOutlineArrowRight
                        className={cn(
                          "text-slate-300 group-hover:text-primary cursor-pointer transition-all",
                          {
                            "rotate-90 text-primary cursor-auto":
                              name === openNome?.name ||
                              (pathname.includes(rootPath as string) &&
                                !openNome.name),
                          }
                        )}
                        size={23}
                      />
                    </button>
                    <div
                      className={cn("space-y-0.5 h-0 overflow-hidden", {
                        "h-fit":
                          name === openNome?.name ||
                          (pathname.includes(rootPath as string) &&
                            !openNome.name),
                      })}
                    >
                      {children?.map((child, inx) => (
                        <button
                          key={inx}
                          onClick={() =>
                            router.push(
                              `/admin/${rootPath}/${child.path as string}`
                            )
                          }
                          className={cn(
                            " text-white hover:text-primary w-full pl-10 pr-4 py-2.5 flex items-center justify-start gap-2 transition-all font-medium hover:bg-[#FCECEC]",
                            {
                              "text-primary relative before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-r-xs before:bg-primary bg-[#FCECEC]":
                                pathname.includes(child.path as string),
                            }
                          )}
                        >
                          <div>{createElement(child.icon, { size: "16" })}</div>
                          <span> {child.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={indx}
                    onClick={() => {
                      setOpenNome({ name: null });
                      router.push(`/admin/${path as string}`);
                    }}
                    className={cn(
                      " text-white hover:text-primary w-full pl-6 pr-4 py-3 flex items-center justify-start gap-3 text-lg transition-all font-medium hover:bg-[#FCECEC]",
                      {
                        "text-primary relative before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-r-xs before:bg-primary bg-[#FCECEC]":
                          (pathname.includes(path as string) && indx !== 0) ||
                          (indx === 0 && pathname === "/admin"),
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

export default AdminSidebar;
