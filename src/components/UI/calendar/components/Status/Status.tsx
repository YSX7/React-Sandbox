import { Button } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import React, { FC } from "react";
import { CalendarMode } from "../../types";

type Props = {
  calendarMode: CalendarMode;
  onMonthClick: () => void;
  onYearClick: () => void;
  children: Dayjs | string;
};

const Status: FC<Props> = ({ children, calendarMode, ...props }) => {
  let renderThis = renderConditional();

  function renderConditional() {
    let outputText: string[];
    outputText = dayjs.isDayjs(children)
      ? [children.format("MMMM"), children.format("YYYY")]
      : children.split(" ");
    switch (calendarMode) {
      case CalendarMode.Days:
        return (
          <>
            <Button onClick={props.onMonthClick} variant="link">
              {outputText[0]}
            </Button>
            &nbsp;
            <Button onClick={props.onYearClick} variant="link">
              {outputText[1]}
            </Button>
          </>
        );
      case CalendarMode.Months:
        return (
          <Button onClick={props.onYearClick} variant="link">
            {outputText[1]}
          </Button>
        );
      case CalendarMode.Years:
        let currentYear = parseInt(outputText[1]);
        let minYear = currentYear - (currentYear % 10);
        let yearOutputText = `${minYear} - ${minYear + 9}`;
        return (
          <Button onClick={props.onYearClick} variant="link">
            {yearOutputText}
          </Button>
        );
    }
  }

  return renderThis;
};

export default Status;
