import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Image as ChakraImage,
  Portal,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import classes from "./style.module.css";

import { CalendarComponentProps, CalendarMode } from "../../types";
import { useDaysCalendar } from "./hooks";

const ListRender = ({
  Wrapper,
  isCalendarFlipped,
  selectedDate,
  calendarMode,
  calendarClick,
  ...props
}: CalendarComponentProps) => {
  const [currentMonthElements, holidayImage, holidayHovered] = useDaysCalendar(
    calendarMode,
    selectedDate,
    calendarClick
  );

  return (
    <div style={{ height: "100%", ...props.style }}>
      <Portal>
        <ChakraImage
          className={classes.mishanya}
          visibility={holidayHovered ? "visible" : "hidden"}
          src={holidayImage}
        />
      </Portal>
      <Wrapper in={!isCalendarFlipped}>
        <Table variant="simple">
          {calendarMode !== CalendarMode.Days && (
            <Thead>
              <Tr>
                {dayjs.weekdaysMin(true).map((elem) => (
                  <Th key={elem}>{elem}</Th>
                ))}
              </Tr>
            </Thead>
          )}
          <Tbody>{currentMonthElements}</Tbody>
        </Table>
      </Wrapper>
    </div>
  );
};

export default ListRender;
