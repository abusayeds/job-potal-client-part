"use client";

import { cn } from "../../utils/cn";
import { IconType } from "react-icons";
import { createElement } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";

const PageHeading = ({
  title,
  backPath,
  hideIcon,
  className,
  backIcon,
}: {
  title: string;
  backPath?: string;
  hideIcon?: boolean;
  className?: string;
  backIcon?: IconType;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-[24px] font-medium",
        className
      )}
    >
      {!hideIcon && (
        <button
          className="outline-none cursor-pointer"
          onClick={() => (backPath ? router.push(backPath) : router.back())}
        >
          {createElement(backIcon || MdArrowBackIos, { size: 20 })}
        </button>
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default PageHeading;
