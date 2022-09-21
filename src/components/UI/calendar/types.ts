import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Dayjs } from "dayjs";
import React, { HTMLAttributes } from "react";

export interface WrapperProps {
  children: React.ReactNode;
  in: boolean;
}

export type RenderFunction = (dayjsDate: Dayjs) => ReactJSXElement;

export interface CalendarComponentProps extends HTMLAttributes<HTMLDivElement> {
  selectedDate: Dayjs;
  isCalendarFlipped: boolean;
  Wrapper: React.FC<WrapperProps>;
  dateCellRender?: RenderFunction;
  calendarClick?: CalendarClick;
}

export type CalendarClick =
  | undefined
  | ((newValue: number) => void)
  | ((newDay: number, newMonth?: number) => void);

export enum CalendarMode {
  Days = "Days",
  Months = "Months",
  Years = "Years",
}
