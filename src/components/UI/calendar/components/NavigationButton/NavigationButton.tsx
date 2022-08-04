import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";
import classes from "./NavigationButton.module.css";

export enum CalendarNavigationButtonType {
  Left = "Left",
  Right = "Right",
}

type Props = {
  type: CalendarNavigationButtonType;
  changeMonth: (month: number) => void;
};

const NavigationButton: FC<Props> = ({ type, changeMonth }) => {
  const LeftButtonAttributes: IconButtonProps = {
    "aria-label": "Previous calendar month",
    icon: <ChevronLeftIcon />,
    textAlign: "end",
    onClick: () => changeMonth(-1),
  };
  const RightButtonAttributes: IconButtonProps = {
    "aria-label": "Next calendar month",
    icon: <ChevronRightIcon />,
    textAlign: "start",
    onClick: () => changeMonth(1),
  };

  return (
    <IconButton
      variant="unstyled"
      className={classes["scroll-button"]}
      {...(type === CalendarNavigationButtonType.Left
        ? LeftButtonAttributes
        : RightButtonAttributes)}
    />
  );
};

export default NavigationButton;
