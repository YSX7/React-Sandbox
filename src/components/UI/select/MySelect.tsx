import { IPost, SortValue } from "@/types/types";
import React, { FC } from "react";
import {
  Select,
  SelectProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import "./style.module.css";

interface IMySelectOption {
  value: keyof IPost | number;
  name: string;
}

interface MySelectProps extends SelectProps {
  defaultValue?: string;
  options?: IMySelectOption[];
  value: SortValue;
}

const MySelect: FC<MySelectProps> = ({
  children,
  defaultValue,
  value,
  onChange,
  ...props
}) => {
  let fontColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
  let placeholderColor = useColorModeValue("gray.500", "whiteAlpha.400");

  return (
    <Select
      {...props}
      value={value}
      onChange={onChange}
      color={value === "" ? placeholderColor : "inherit"}
      _focus={{ color: fontColor }}
    >
      <option value="">{defaultValue}</option>
      {children}
    </Select>
  );
};

export default MySelect;
