import React from "react";
import { cn } from "@/utils/cn";

export const employerFilterData = [
  {
    category: "Industry Type",
    inputType: "radio",
    options: [
      { label: "All", value: "all" },
      { label: "Technical & Engineering", value: "technical-engineering" },
      { label: "Business & Finance", value: "business-finance" },
      {
        label: "Sales, Marketing & Customer Service",
        value: "sales-marketing-customer-service",
      },
      { label: "Education & Training", value: "education-training" },
      { label: "Legal & Government", value: "legal-government" },
    ],
  },
  {
    category: "Organization Type",
    inputType: "radio",
    options: [
      { label: "All", value: "all" },
      { label: "Federal Government", value: "federal-government" },
      { label: "County Government", value: "county-government" },
      { label: "City Government", value: "city-government" },
      { label: "State Government", value: "state-government" },
      { label: "Local Government", value: "local-government" },
      { label: "NGO", value: "ngo" },
      { label: "Private Company", value: "private-company" },
      { label: "International Agencies", value: "international-agencies" },
      { label: "Airport Authority", value: "airport-authority" },
    ],
  },
];
const EmployersFilter = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <div className="lg:border-r border-gray-300 flex flex-col divide-y divide-gray-300 w-full">
        {employerFilterData.map((item, parentIdx) => (
          <div key={parentIdx + 1} className="py-2 order-3">
            <h4 className="text-lg 2xl:text-xl font-semibold p-3 text-brand">
              {item.category}
            </h4>
            <div className="p-3 pt-0 space-y-2 text-brand/70">
              {item.options.map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type={item.inputType}
                    id={`${item.category}-${option.value}`}
                    name={item.category}
                    value={option.value}
                    className="cursor-pointer w-4 h-4 text-brand"
                  />
                  <label
                    htmlFor={`${item.category}-${option.value}`}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployersFilter;
