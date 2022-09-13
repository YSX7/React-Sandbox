import { Table, Tbody, Td, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { CalendarComponentProps } from "../../types";
import classes from "../../Calendar.module.css";

// TODO: поправить багулину с подсветкой "текущего" месяца, должно подсвечиваться только в текущем году
const ListMonths = (props: CalendarComponentProps) => {
  const { isCalendarFlipped, Wrapper, calendarClick } = props;

  const monthElements = [];
  for (let i = 0; i < 3; i++)
    monthElements.push(
      <Tr>
        {dayjs
          .months()
          .slice(i * 4, (i + 1) * 4)
          .map((elem, index) => (
            <Td
              key={elem}
              className={dayjs().month() === index + i * 4 && classes.today}
              onClick={() =>
                calendarClick !== undefined && calendarClick(index + i * 4)
              }
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
          <Tbody>{monthElements}</Tbody>
        </Table>
      </Wrapper>
    </React.Fragment>
  );
};

export default ListMonths;
