import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCellProps,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import classes from "./ListDays.module.css";
import calendarClasses from "../../Calendar.module.css";
import september3 from "@/styles/september3.png";
import { CalendarComponentProps, WrapperProps } from "../../types";

const ListDays = (props: CalendarComponentProps) => {
  const [isSeptemberThirdHovered, setIsSeptemberThirdHovered] = useState(false);
  const { selectedDate, isCalendarFlipped, Wrapper } = props;

  const constructDaysCalendar = (): ReactJSXElement[] => {
    const result = [];
    /**
     * Переменная для прохода по всем дням месяца
     */
    let loopMonth = dayjs(selectedDate).startOf("month");
    //Если первый день не понедельник - выводим дни прошлого месяца
    if (loopMonth.weekday() !== 1) {
      loopMonth = loopMonth.subtract(loopMonth.weekday(), "days");
    }

    do {
      const currentWeekElements = [];
      for (let i = 0; i < 7; i++) {
        let attributes: TableCellProps = {};
        let className = "";
        //Если дни с других месяцев - затеняем
        if (loopMonth.month() !== selectedDate.month())
          className = calendarClasses.neighbour;
        //Если текущий день - выделяем
        if (dayjs().format("DMYYY") === loopMonth.format("DMYYY"))
          className = calendarClasses.today;
        //Если 3 сентября - активируем Шуфутинского
        if (loopMonth.format("DM") === "39") {
          attributes["onMouseOver"] = () => {
            setIsSeptemberThirdHovered(true);
          };
          attributes["onMouseLeave"] = () => {
            setIsSeptemberThirdHovered(false);
          };
        }
        currentWeekElements.push(
          <Td
            className={className}
            key={loopMonth.format("DMYYYY")}
            {...attributes}
          >
            {loopMonth.format("DD")}
          </Td>
        );
        loopMonth = loopMonth.add(1, "d");
      }
      result.push(<Tr key={loopMonth.week()}>{currentWeekElements}</Tr>);
    } while (selectedDate.month() === loopMonth.month());
    return result;
  };

  const currentMonthElements = useMemo(constructDaysCalendar, [selectedDate]);

  return (
    <div style={{ height: "100%" }}>
      <ChakraImage
        className={classes.mishanya}
        visibility={isSeptemberThirdHovered ? "visible" : "hidden"}
        src={september3}
      />
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
