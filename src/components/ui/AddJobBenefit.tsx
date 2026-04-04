import { Button, Form, Input, Tag } from "antd";
import React, { Dispatch, useState, useEffect } from "react";

const AddJobBenefit = ({
  benefits,
  setBenefits,
}: {
  benefits: string[];
  setBenefits: Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (benefits.length >= 3) {
      setError(null); // clear error if valid
    }
  }, [benefits]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addBenefit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      setBenefits((prev) => [...prev, trimmed]);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBenefit();
    }
  };

  const handleTagClose = (removedTag: string) => {
    setBenefits((prev) => prev.filter((b) => b !== removedTag));
  };

  return (
    <div>
      <p className="text-lg sm:text-xl mb-3">Job Benefits:</p>
      {!!benefits.length && (
        <div className="flex flex-wrap gap-1 mb-2">
          {benefits.map((item, index) => (
            <Tag
              key={index}
              closable
              bordered={false}
              color="green"
              onClose={() => handleTagClose(item)}
              style={{ fontSize: 16, padding: "6px 10px" }}
            >
            {item}
            </Tag>
          ))}
        </div>
      )}

      <Form.Item
        validateStatus={error ? "error" : ""}
        help={error || ""}
      >
        <Input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          size="large"
          placeholder="Add job benefits"
        />
      </Form.Item>

      <Button
        disabled={!value.trim()}
        size="middle"
        htmlType="button"
        onClick={() => {
          addBenefit();
        }}
      >
        Add Benefit
      </Button>

      {/* Manual validation error display (optional) */}
      {benefits.length < 3 && (
        <div className="text-red-500 mt-2 text-sm">
          Please enter at least three job benefits.
        </div>
      )}
    </div>
  );
};

export default AddJobBenefit;