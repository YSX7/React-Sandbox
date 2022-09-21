import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { ComponentProps, useState } from "react";
import classes from "./MyInputPassword.module.css";

const MyInputPassword = React.forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>((props, ref) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleClick = () => setIsShow(!isShow);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        ref={ref}
        className={classes.myInput}
        type={isShow ? "text" : "password"}
        {...props}
      ></Input>
      <InputRightElement w="4.5rem" h="100%">
        <Button
          fontSize={"sm"}
          onMouseDown={handleClick}
          onMouseUp={handleClick}
          variant="outline"
        >
          {!isShow ? "Показать" : "Скрыть"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});

export default MyInputPassword;
