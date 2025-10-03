"use client";

import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { TQuery } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

const PaginationComp = ({
  totalData,
  showSizeChanger = true,
}: {
  totalData: number;
  showSizeChanger?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<TQuery>({
    page: parseInt(searchParams.get("page") || "1", 10), // Set page from URL or default to 1
    limit: parseInt(searchParams.get("limit") || "10", 10), // Set limit from URL or default to 10
  });

  useEffect(() => {
    // Create a new URLSearchParams object to merge the query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", query.limit.toString());
    params.set("page", query.page.toString());

    // Push the new URL to the router
    router.push(`?${params.toString()}`);
  }, [query.page, query.limit]);

  return (
    <div className="py-4">
      <Pagination
        align="center"
        showQuickJumper={true}
        showSizeChanger={showSizeChanger}
        total={totalData || 1}
        current={query.page}
        defaultCurrent={1}
        onChange={(page) => setQuery((c) => ({ ...c, page }))}
        pageSize={query.limit}
        onShowSizeChange={(_current, size) =>
          setQuery((c) => ({ ...c, limit: size }))
        }
      />
    </div>
  );
};

export default PaginationComp;
