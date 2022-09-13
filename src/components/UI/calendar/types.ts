import { Dayjs } from "dayjs";
import React, { HTMLAttributes } from "react";

export interface WrapperProps {
  children: React.ReactNode;
  in: boolean;
}

export interface CalendarComponentProps extends HTMLAttributes<HTMLDivElement> {
  selectedDate: Dayjs;
  isCalendarFlipped: boolean;
  Wrapper: React.FC<WrapperProps>;
  calendarClick?:
    | ((newValue: number) => void)
    | ((newDay: number, newMonth?: number) => void);
}

export enum CalendarMode {
  Days = "Days",
  Months = "Months",
  Years = "Years",
}
