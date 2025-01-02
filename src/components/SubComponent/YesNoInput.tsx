import React, { useEffect, useState } from "react";

type TRatingInProps = {
  label: string;
  setReviewData: (data: { [key: string]: any }) => void;
  fieldName: string;
};

const YesNoInput = ({ label, setReviewData, fieldName }: TRatingInProps) => {
  const [opinion, setOpinion] = useState<boolean | null>(null); // Boolean state for Yes/No

  useEffect(() => {
    if (opinion !== null) {
      setReviewData((prev: any) => ({
        ...prev,
        [fieldName]: opinion,
      }));
    }
  }, [opinion]);

  return (
    <div className="space-y-4">
      <p className="text-base lg:text-lg text-black">{label}</p>
      <div className="w-full flex flex-nowrap justify-center gap-7 lg:gap-14">
        {/* No Button */}
        <div className="space-y-3.5 text-center">
          <button
            type="button"
            onClick={() => setOpinion(false)} // Set as false
            style={{
              background: opinion === false ? "#ff5252" : "#C1C1C1",
            }}
            className="outline-none h-12 sm:h-14 lg:h-16 w-12 sm:w-14 lg:w-16 rounded-full"
          >
            {opinion === false && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="0.936"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 10.9394L16.9697 5.96961L18.0304 7.03027L13.0606 12L18.0303 16.9697L16.9697 18.0304L12 13.0607L7.03045 18.0302L5.96979 16.9696L10.9393 12L5.96973 7.03042L7.03039 5.96976L12 10.9394Z"
                  fill="#ffffff"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-gray-500 text-sm md:text-base">No</p>
        </div>

        {/* Yes Button */}
        <div className="space-y-3.5 text-center">
          <button
            type="button"
            onClick={() => setOpinion(true)} // Set as true
            style={{
              background: opinion === true ? "#699f4c" : "#C1C1C1",
            }}
            className="outline-none h-12 sm:h-14 lg:h-16 w-12 sm:w-14 lg:w-16 rounded-full"
          >
            {opinion === true && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                strokeWidth="1.128"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.9647 14.9617L17.4693 7.44735L18.5307 8.50732L9.96538 17.0837L5.46967 12.588L6.53033 11.5273L9.9647 14.9617Z"
                  fill="#ffffff"
                ></path>
              </svg>
            )}
          </button>
          <p className="text-gray-500 text-sm md:text-base">Yes</p>
        </div>
      </div>
    </div>
  );
};

export default YesNoInput;
