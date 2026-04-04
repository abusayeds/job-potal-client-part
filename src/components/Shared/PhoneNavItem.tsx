import { imageUrl } from "@/config";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { cn } from "@/utils/cn";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdWifiCalling2 } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Swal from "sweetalert2";

const PhoneNavItem = ({
  currentPath,
  from,
}: {
  currentPath: string;
  from?: string;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Find Job", path: "find-job" },
    { name: "Job Seekers", path: "job-seekers" },
    { name: "Employers", path: "employers" },
    { name: "About Us", path: "about-us" },
  ];

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
    setOpen(false);
  }, [pathName]);
  const content = (
    <div className="text-center mt-3 min-h-[50vh] flex flex-col justify-between">
      <div className="flex flex-col flex-1 bg-gray-50 pt-2 pb-3 min-w-[220px]">
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
                  "py-2 px-3 text-base cursor-pointer active:bg-[#FCECEC] text-brand/70 hover:text-brand transition-all relative hover:before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary",
                  {
                    "text-[#000000] transition-all relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary pb-3":
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
                "py-2 px-3 text-base cursor-pointer active:bg-[#FCECEC] text-brand/70 hover:text-brand transition-all relative hover:before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary",
                {
                  "text-[#000000] transition-all relative before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary pb-3":
                    from === "dashboard",
                }
              )}
            >
              Dashboard
            </button>
          </Link>
        )}
        <Link href={`/contact`}>
          <button
            className={cn(
              "py-2 px-3 text-base cursor-pointer active:bg-[#FCECEC] text-brand/80 hover:text-[#000000] transition-all relative hover:before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-primary",
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
      {user?._id && (
        <button
          onClick={handleLogOut}
          className="bg-light-gray/20 w-full py-3 flex items-center justify-center gap-3 outline-none font-medium text-[#373643] bg-[#FCECEC] pr-1.5"
        >
          <RiLogoutCircleRLine className="text-red-400" size={18} />
          <span>Log-out</span>
        </button>
      )}
    </div>
  );
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      title={
        user?._id ? (
          <div className="mx-auto mt-2 relative h-14 w-14 aspect-[4/1] rounded-full overflow-hidden border-2 border-blue-200">
            <Link
              href={
                user.role === "admin"
                  ? "/admin/admin-settings/profile"
                  : `/settings#account`
              }
            >
              <Image
                src={user?.logo ? imageUrl + user.logo : "/demo-profile.jpg"}
                alt="profile"
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
              />
            </Link>
          </div>
        ) : (
          <div className="flex justify-end gap-3 mt-1">
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
              Sign Up
            </button>
          </div>
        )
      }
      content={content}
      trigger={"click"}
    >
      <button className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-base font-medium rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer border border-blue-300 text-blue-500 hover:bg-blue-50 focus:ring-blue-200">
        <RxHamburgerMenu size={20} />
      </button>
    </Popover>
  );
};

export default PhoneNavItem;
