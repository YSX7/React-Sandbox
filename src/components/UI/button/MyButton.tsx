import React, { FC } from "react";
import classes from "./MyButton.module.css";
import cl from "classnames";
import { Button, ButtonProps } from "@chakra-ui/react";

export enum MyButtonVariant {
  rounded = "rounded",
  shadowed = "shadowed",
}

interface IMyButtonProps extends ButtonProps {
  className?: string;
  variant?: MyButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

const MyButton: FC<IMyButtonProps> = ({ children, variant, ...props }) => {
  const rootClasses = cl(classes.myBtn, props.className);
  return (
    <Button
      bg="transparent"
      {...props}
      className={rootClasses}
      style={{
        borderRadius: variant === MyButtonVariant.rounded ? "3px" : "none",
        boxShadow:
          variant === MyButtonVariant.shadowed
            ? "0px 1px 6px #00000036"
            : "none",
      }}
    >
      {children}
    </Button>
  );
};

export default MyButton;
