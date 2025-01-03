/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

type TRatingInProps = {
  label: string;
  setReviewData: (data: { [key: string]: any }) => void;
  fieldName: string;
};
const TagSelectInput = ({
  label,
  setReviewData,
  fieldName,
}: TRatingInProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const tagLists = [
    "Challenging Workouts",
    "Great for Beginners",
    "Pushes Your Limits",
    "Advanced Techniques",
    "Accessible for All Levels",
    "Great Playlist",
    "Hands-On Adjustments",
    "Great Cues",
  ];
  useEffect(() => {
    setReviewData((c: any) => ({ ...c, [fieldName]: tags }));
  }, [tags]);
 
  return (
    <div className="space-y-8">
      <p className="text-base lg:text-lg text-black">{label}</p>
      <div className="w-full grid md:grid-cols-2 gap-4">
        {tagLists.map((item, indx) => (
          <div key={indx} className="flex items-center gap-3">
            <Checkbox
              checked={tags.includes(item)}
              onClick={() =>
                setTags((c) =>
                  c.includes(item)
                    ? c.filter((data) => data !== item)
                    : tags.length > 2
                    ? c
                    : [...c, item]
                )
              }
              id={item}
              className="h-5 w-5"
            />
            <label
              htmlFor={item}
              className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelectInput;
