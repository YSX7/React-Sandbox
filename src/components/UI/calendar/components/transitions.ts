import { Lookup } from "@react-spring/types";
import { Dayjs } from "dayjs";
import { useState } from "react";
import {
  easings,
  TransitionFn,
  useTransition,
  UseTransitionProps,
} from "react-spring";
import { CalendarMode } from "../types";

export const useScrollTransition = (
  selectedDate: Dayjs
): [
  React.Dispatch<React.SetStateAction<boolean>>,
  TransitionFn<string, Lookup<any>>
] => {
  const [isMoveLeft, setIsMoveLeft] = useState(false);

  const transition = useTransition<string, UseTransitionProps>(
    selectedDate.format("DDMMYYYY"),
    {
      initial: { transform: "translateX(0vw)" },
      from: {
        transform: `translateX(${isMoveLeft ? "-100" : "100"}vw)`,
        position: "absolute",
        left: "25%",
        opacity: 0,
      },
      enter: {
        transform: "translateX(0vw)",
        position: "",
        opacity: 1,
      },
      leave: {
        transform: `translateX(${isMoveLeft ? "100" : "-100"}vw)`,
        position: "absolute",
        left: "25%",
        opacity: 0,
      },
      config: { duration: 500, easing: easings.easeOutExpo },
    }
  );

  return [setIsMoveLeft, transition];
};

export const useZoomTransition = (
  calendarMode: CalendarMode
): [
  React.Dispatch<React.SetStateAction<boolean>>,
  TransitionFn<string, Lookup<any>>
] => {
  const [isZoomIn, setIsZoomIn] = useState(true);

  const transition = useTransition<string, UseTransitionProps>(calendarMode, {
    initial: { scale: 1, opacity: 1, position: "initial" },
    from: {
      scale: isZoomIn ? 4 : 0,
      opacity: 0,
      left: "25%",
    },
    enter: { scale: 1, opacity: 1, position: "initial" },
    leave: {
      scale: isZoomIn ? 0 : 4,
      opacity: 0,
      position: "absolute",
      left: "25%",
    },
    trail: 125,
    config: { duration: 250 },
  });

  return [setIsZoomIn, transition];
};
