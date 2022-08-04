import { Input } from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import classes from "./myInput.module.css";

const MyInput = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>((props, ref) => {
  return <Input ref={ref} className={classes.myInput} {...props}></Input>;
});

export default MyInput;
