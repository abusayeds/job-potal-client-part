import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";

type TBrandingProps = {
  className?: string;
};

const WebsiteBranding = ({ className }: TBrandingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 lg:gap-5 pt-6 px-3",
        className
      )}
    >
      <div className="h-28 w-32 hidden lg:block">
        <Image
          src={logo}
          alt="logo"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="font-bold font-syne text-3xl md:text-5xl lg:text-6xl text-[#052255] relative">
        R8 My Trainers
        <p className="font-normal text-[10px] md:text-xs border border-[#052255] rounded-full absolute top-1 -right-9 p-0.5 md:p-1">TM</p>
      </div>
      <p className="text-base md:text-2xl lg:text-3xl text-popover lg:tracking-widest text-center">
        Real Trainers. Real Reviews. Real Results
      </p>
    </div>
  );
};

export default WebsiteBranding;
