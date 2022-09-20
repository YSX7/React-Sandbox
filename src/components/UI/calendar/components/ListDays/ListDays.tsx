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
import classes from "./ListDays.module.css";

import { CalendarComponentProps } from "../../types";
import { useDaysCalendar } from "./hooks";

const ListDays = ({
  selectedDate,
  isCalendarFlipped,
  Wrapper,
  calendarClick,
  ...props
}: CalendarComponentProps) => {
  // for (const path in Images) {
  //   Images[path]().then((mod) => {
  //     console.log(path, mod);
  //   });
  // }

  const [currentMonthElements, holidayImage, holidayHovered] = useDaysCalendar(
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
          <Thead>
            <Tr>
              {dayjs.weekdaysMin(true).map((elem) => (
                <Th key={elem}>{elem}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>{currentMonthElements}</Tbody>
        </Table>
      </Wrapper>
    </div>
  );
};

export default React.memo(ListDays);
