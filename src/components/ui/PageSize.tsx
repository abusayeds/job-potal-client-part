"use client";

import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PageSize = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string, name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-end gap-2 font-roman-bold">
      <Select
        onChange={(value) => handleChange(value, "sort")}
        //   size="large"
        placeholder="Sort type"
        defaultValue={"-createdAt"}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { label: "Newest", value: "-createdAt" },
          { label: "Latest", value: "createdAt" },
        ]}
        // item.charAt(0).toUpperCase() + item.slice(1)
        style={{ width: 100 }}
      />
      <Select
        onChange={(value) => handleChange(value, "limit")}
        //   size="large"
        placeholder="Per Page"
        defaultValue={searchParams.get("limit") || "10"}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[10, 15, 20, 30, 50].map((item) => ({
          value: item.toString(),
          label: `${item} per page`,
        }))}
        style={{ width: 120 }}
      />
    </div>
  );
};

export default PageSize;
