import { createElement } from "react";
import { IconType } from "react-icons";

const AdminStatus = ({
  data,
}: {
  data: { icon: IconType; label: string; value: number | string }[];
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-5 2xl:gap-8 justify-between">
        {data.map((item, inx) => (
          <div
            key={inx}
            className="px-5 xl:px-7 py-5 xl:py-7 rounded-lg flex justify-between items-center gap-4 border border-gray-200 shadow-sm bg-white w-full"
          >
            <div className="bg-gray-400 p-3.5 rounded-xl">
              {createElement(item.icon, { className: "w-10 h-10 text-white" })}
            </div>
            <div className="space-y-2 text-end">
              <h3 className="xl:text-lg text-brand/80 capitalize font-semibold">
                Total {item.label}
              </h3>
              <h3 className="text-3xl xl:text-4xl text-brand font-roman-bold">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminStatus;
