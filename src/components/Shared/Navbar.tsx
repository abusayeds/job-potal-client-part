"use client";

import { imageUrl } from "@/config";
import { useUnreadNoticeQuery } from "@/redux/features/notification/notification.api";
import { useAppSelector } from "@/redux/hook";
import { cn } from "@/utils/cn";
import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdWifiCalling2 } from "react-icons/md";
// import { RxHamburgerMenu } from "react-icons/rx";
import PhoneNavItem from "./PhoneNavItem";

const Navbar = ({ from }: { from?: string }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const previousScrollRef = useRef(0);
  const { user } = useAppSelector((state) => state.auth);
  const [scrollDifference, setScrollDifference] = useState(0);
  const { data, refetch } = useUnreadNoticeQuery(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = previousScrollRef.current;
      const difference = currentScrollY - previousScrollY;
      setScrollDifference(difference);
      previousScrollRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    refetch();
  }, [currentPath]);
  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Find Job", path: "find-job" },
    { name: "Job Seekers", path: "job-seekers" },
    { name: "Employers", path: "employers" },
    { name: "About Us", path: "about-us" },
  ];
  // useEffect(() => {
  //   if (user?.role === "employer" || user?.role === "employee") {
  //     console.log(user)
  //     navigationItems.splice(2, 0, {
  //       name: "Job Seekers",
  //       path: "job-seekers",
  //     });
  //   }
  // }, [user]);
  // console.log(user?.role);

  return (
    <div
      className={cn(
        "sticky top-0 left-0 z-40 -translate-y-0 transition-all duration-400",
        {
          "lg:-translate-y-14": scrollDifference > 0,
        }
      )}
    >
      {/* Desktop Navbar */}
      <div className={cn("hidden lg:block bg-lightgray")}>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-300/90"></div>
        <div className="container mx-auto px-2 lg:px-4 flex justify-between">
          <div className="flex justify-start gap-3">
            {navigationItems
              .filter(
                (item) =>
                  !(
                    item.path === "job-seekers" &&
                    !["employee", "employer"].includes(user?.role as string)
                  )
              )
              .map((item, index) => (
                <Link href={`/${item.path}`} key={item.path}>
                  <button
                    className={cn(
                      "py-3.5 px-3 text-base cursor-pointer text-brand/70 hover:text-brand transition-all relative hover:before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary",
                      {
                        "text-[#000000] transition-all relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary":
                          (currentPath === "/" && index === 0) ||
                          !!currentPath.split("/").includes(item.path),
                      }
                    )}
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
            {user?._id && (
              <Link href={user.role === "admin" ? "/admin" : `/overview`}>
                <button
                  className={cn(
                    "py-3.5 px-3 text-base cursor-pointer text-brand/70 hover:text-brand transition-all relative hover:before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary",
                    {
                      "text-[#000000] transition-all relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary":
                        from === "dashboard",
                    }
                  )}
                >
                  Dashboard
                </button>
              </Link>
            )}
          </div>
          <Link href={`/contact`}>
            <button
              className={cn(
                "py-3.5 px-3 text-base cursor-pointer text-brand/80 hover:text-[#000000] transition-all relative hover:before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary",
                {
                  "text-brand transition-all relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary":
                    currentPath === "/contact",
                }
              )}
            >
              <p className="flex items-center gap-2">
                <MdWifiCalling2 size={18} /> <span>Contact Us</span>
              </p>
            </button>
          </Link>
        </div>
      </div>
      {/* user info  navbar */}
      <div className="bg-white shadow-xs">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 flex justify-between gap-2 items-center py-4 2xl:py-5">
          <div className="relative w-full max-w-36 lg:max-w-40 xl:max-w-48 aspect-[4/1]">
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
          <div className="flex justify-end items-center gap-2 lg:hidden">
            {user?._id && (
              <Badge
                offset={[-5, 10]}
                count={data?.data || undefined}
                size="small"
              >
                <button
                  onClick={() => router.push("/notification")}
                  className="outline-none cursor-pointer p-2 text-blue-500 hover:text-blue-700 transition-all"
                >
                  <IoMdNotificationsOutline size={24} />
                </button>
              </Badge>
            )}
            <PhoneNavItem currentPath={currentPath} from={from} />
          </div>
          <div className="hidden lg:flex items-center justify-end gap-3">
            {user?._id ? (
              <>
                <Badge offset={[-5, 5]} count={data?.data || undefined}>
                  <button
                    onClick={() => router.push("/notification")}
                    className="outline-none cursor-pointer bg-gray-50 rounded-full p-2 text-blue-500 hover:text-blue-700 transition-all"
                  >
                    <IoMdNotificationsOutline size={33} />
                  </button>
                </Badge>
                <div className="ml-1 relative h-12 w-12 aspect-[4/1] rounded-full overflow-hidden border-2 border-blue-200">
                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin/admin-settings/profile"
                        : `/settings#account`
                    }
                  >
                    <Image
                      src={
                        user.logo ? imageUrl + user.logo : "/demo-profile.jpg"
                      }
                      alt="profile"
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100vw"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => router.push("/sign-in")}
                  className="px-8 py-2 text-base font-medium rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="px-8 py-2 text-base font-medium rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-200"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
