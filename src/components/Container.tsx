import { cn } from "@/lib/utils";
import React from "react";

type TContainerProps = {
  className?: string;
  children: React.ReactNode;
};
const Container = ({ className, children }: TContainerProps) => {
  return <div className={cn("max-w-[1620px] mx-auto px-2 md:px-4 lg:px-6 py-6 lg:py-10", className)}>{children}</div>;
};

export default Container;
