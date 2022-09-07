import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCellProps,
  Image as ChakraImage,
  Portal,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import classes from "./ListDays.module.css";
import calendarClasses from "../../Calendar.module.css";
import { CalendarComponentProps } from "../../types";
import Holidays from "./Holidays";

const ListDays = (props: CalendarComponentProps) => {
  // for (const path in Images) {
  //   Images[path]().then((mod) => {
  //     console.log(path, mod);
  //   });
  // }
  console.log(Holidays);
  const [holidayImage, setHolidayImage] = useState("");
  const [holidayHovered, setHolidayHovered] = useState(false);
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
        if (dayjs().format("DMYYYY") === loopMonth.format("DMYYYY"))
          className = calendarClasses.today;
        //Если 3 сентября - активируем Шуфутинского
        let dm = loopMonth.format("DM") as keyof typeof Holidays;
        if (Holidays[dm]) {
          attributes["onMouseOver"] = () => {
            setHolidayImage(Holidays[dm]);
            setHolidayHovered(true);
          };
          attributes["onMouseLeave"] = () => {
            setHolidayHovered(false);
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
