import { IPost, SortValue } from "@/types/types";
import React, { FC } from "react";
import { Select } from "@chakra-ui/react";

interface IMySelectOption {
  value: keyof IPost | number;
  name: string;
}

interface MySelectProps {
  defaultValue?: string;
  options?: IMySelectOption[];
  value: SortValue;
  onChange: (selectedSort: SortValue) => void;
}

const MySelect: FC<MySelectProps> = ({
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <Select
      value={value}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.target.value as keyof IPost)
      }
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
};

export default MySelect;
