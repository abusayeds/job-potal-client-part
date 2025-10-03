"use client";

import { getRoleLabel } from "@/lib/getRoleLabel";
import { useAppSelector } from "@/redux/hook";
import { TRole } from "@/types";
import { Badge } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Container from "../Container";

const Header = () => {
  const router = useRouter();
  //   const { socket } = useAppContext();
  const pathName = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  //   const { data: noticeData, refetch } = useUnreadNoticeQuery(undefined);
  //   useEffect(() => {
  //     if (!user?.id || !socket) return;
  //     console.log(socket, `notification::${user?.id}`);
  //     socket?.on(`notification::${user?.id}`, (notice) => {
  //       refetch();
  //       console.log(36, notice);
  //     });
  //     // @ts-ignore
  //     socket?.on(`notification`, (notice) => {
  //       refetch();
  //       console.log(41, notice);
  //     });
  //   }, [user, socket]);
  useEffect(() => {
    if (pathName === "/notification") {
      //   refetch();
    }
  }, [pathName]);
  return (
    <Container
      className="w-full py-5 sticky top-0 bg-white z-10"
      mClassName="py-0 lg:py-0 xl:py-0"
    >
      <div className="h-[88px] flex justify-between items-center lg:rounded-xl py-[16px] px-[32px] shadow-[0, 0.5px, 1px, 0, #C7DDF6] bg-primary shadow-sm text-white">
        <div className="text-start space-y-0.5">
          <p className="text-[24px] font-semibold">{"Welcome!!"}</p>
          <p className="">{"Have a nice day!"}</p>
        </div>
        <div className="flex gap-x-6">
          <div
            onClick={() => router.push("/notification")}
            className="relative flex items-center "
          >
            <Badge
              // style={{ border }}
              //   count={noticeData?.data?.count || 0}
              count={8}
              showZero={true}
              offset={[-5, 5]}
            >
              <IoIosNotificationsOutline
                style={{ cursor: "pointer" }}
                className={`text-white hover:text-yellow-400 border w-[48px] h-[48px] rounded-full p-2 shadow-sm transition-all`}
              />
            </Badge>
          </div>
          <div
            onClick={() => router.push("/admin/admin-settings/profile")}
            className="flex items-center gap-3"
          >
            {/* <div>
            <Image 
              src={user?.image}
              alt=""
              className="rounded-full h-[48px] w-[48px] min-h-[48px] max-h-[48px] border"
            />
           </div> */}
            <div className="space-y-1">
              <h5 className="text-[17px] font-medium">{user?.name}</h5>
              <p className="text-xs text-white/90">
                {getRoleLabel(user?.role as TRole)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
