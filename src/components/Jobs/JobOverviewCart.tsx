import React, { createElement } from "react";
import { IconType } from "react-icons";

const JobOverviewCart = ({
  data,
}: {
  data: { label: string; icon: IconType; value: string };
}) => {
  return (
    <div className="space-y-4">
      {createElement(data.icon, {
        className: "size-7 sm:size-8 text-primary",
      })}
      <div className="space-y-1.5">
        <p className="text-sm text-brand/60">{data.label}</p>
        <h5 className="text-brand font-medium">
          {data.value}
        </h5>
      </div>
    </div>
  );
};

export default JobOverviewCart;
