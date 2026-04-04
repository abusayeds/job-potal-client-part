"use client";

import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { useGetEarningDataQuery } from "@/redux/features/dashboard/dashboard.api";
import { cn } from "@/utils/cn";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

// const chart = [
//   { month: "Jan", value: 5 },
//   { month: "Feb", value: 8 },
//   { month: "Mar", value: 4 },
//   { month: "Apr", value: 7 },
//   { month: "May", value: 4 },
//   { month: "Jun", value: 6 },
//   { month: "Jul", value: 7 },
//   { month: "Aug", value: 2 },
//   { month: "Sep", value: 2 },
//   { month: "Oct", value: 2 },
//   { month: "Nov", value: 5 },
//   { month: "Dec", value: 8 },
// ];

const EarningBarChart = ({ className }: { className?: string }) => {
  const [cartYear, setCartYear] = useState(new Date().getFullYear());

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setCartYear(new Date(dateString as string).getFullYear());
  };

  const { data } = useGetEarningDataQuery(cartYear);
  // console.log(data?.data);

  const chartData = data?.data
    ? Object.entries(data.data).map(([month, value]) => ({
        month: month.substring(0, 3),
        value: (value as number) / 1000,
        fullMonth: month,
      }))
    : [];

  return (
    <div
      className={cn(
        "rounded-lg pt-10 pb-4 border border-gray-200 shadow-sm p-4",
        className
      )}
    >
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-2xl font-bold">Income Ratio</h4>
        <DatePicker
          prefix={"Year"}
          placeholder="Year"
          allowClear={false}
          picker="year"
          value={dayjs(`${cartYear}`, "YYYY")}
          onChange={onChange}
          style={{
            border: "none",
            borderBottom: "1px solid gray",
            borderRadius: 1,
            width: "120px",
            paddingLeft: 5,
            paddingRight: 5,
          }}
        />
      </div>
      <div className="w-full max-w-full overflow-hidden">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            // data={data?.data || []}
            // data={chart}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray=""
              stroke="#959393"
            />
            <XAxis
              // axisLine={false}
              dataKey="month"
              tick={{ stroke: "#7D7D7D", strokeWidth: 0 }}
            />
            <YAxis
              axisLine={false}
              tick={{ stroke: "#959393", strokeWidth: 0 }}
              tickFormatter={(value) =>
                `€ ${value.toString().length < 2 ? "0" + value : value}k`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#007BFF"
              barSize={36}
              activeBar={<Rectangle fill="#16B989" stroke="#00D698" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#EEF7E6] p-2 rounded shadow-lg border border-gray-100 min-w-[80px] text-center divide-y">
        <p className="text-green-500 font-semibold pb-0.5">{`${payload[0].value}K`}</p>
        <p className="text-green-500 font-semibold">{label}</p>
      </div>
    );
  }
  return null;
};
export default EarningBarChart;
