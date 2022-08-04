import { Dayjs } from "dayjs";

export interface WrapperProps {
  children: React.ReactNode;
  in: boolean;
}

export type CalendarComponentProps = {
  selectedDate: Dayjs;
  isCalendarFlipped: boolean;
  Wrapper: React.FC<WrapperProps>;
  calendarClick?: (newValue: number) => void;
};
