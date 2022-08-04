import { Table, Tbody, Td, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { CalendarComponentProps } from "../../types";
import classes from "../../Calendar.module.css";

const ListYears = (props: CalendarComponentProps) => {
  const { isCalendarFlipped, Wrapper, selectedDate, calendarClick } = props;

  const yearElements = [];

  let currentYear = selectedDate.year();
  let minYear = currentYear - (currentYear % 10);
  let yearArray = Array(10)
    .fill(minYear)
    .map((x, y) => x + y);
  for (let i = 0; i < 2; i++)
    yearElements.push(
      <Tr>
        {yearArray.slice(i * 5, (i + 1) * 5).map((elem) => (
          <Td
            key={elem}
            onClick={() => calendarClick(elem)}
            className={dayjs().year() === elem && classes.today}
          >
            {elem}
          </Td>
        ))}
      </Tr>
    );

  return (
    <React.Fragment>
      <Wrapper in={!isCalendarFlipped}>
        <Table variant="simple" className={classes.centered}>
          <Tbody>{yearElements}</Tbody>
        </Table>
      </Wrapper>
    </React.Fragment>
  );
};

export default ListYears;
