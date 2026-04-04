import { TContainerProps } from "@/types";
import { cn } from "@/utils/cn";
import React from "react";

const Container = ({ children, mClassName, ...pProps }: TContainerProps) => {
  return (
    <div className={cn("w-full relative", pProps?.className)} {...pProps}>
      <div
        className={cn(
          "container w-full mx-auto px-2 sm:px-4 lg:px-6 py-12 lg:py-16 xl:py-20",
          mClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
