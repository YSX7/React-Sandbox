import { TableCellProps, Td, Tr } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import React, { useMemo, useState } from "react";
import calendarClasses from "../../Calendar.module.css";
import {
  CalendarClick,
  CalendarComponentProps,
  CalendarMode,
} from "../../types";
import Holidays from "./Holidays";

export const useDaysCalendar = (
  calendarMode: CalendarMode,
  selectedDate: Dayjs,
  calendarClick: CalendarClick
): [ReactJSXElement[], string, boolean] => {
  const [holidayImage, setHolidayImage] = useState("");
  const [holidayHovered, setHolidayHovered] = useState(false);

  const monthElements = useMemo<ReactJSXElement[]>(() => {
    /**
     * Переменная для прохода по всем дням месяца
     */
    let monthElements = [];
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
        //Если дни с других месяцев - затеняем,
        //Если текущий день - выделяем
        className = classNames(
          {
            [calendarClasses.neighbour]:
              loopMonth.month() !== selectedDate.month(),
          },
          {
            [calendarClasses.today]:
              dayjs().format("DMYYYY") === loopMonth.format("DMYYYY"),
          },
          {
            [calendarClasses.selected]: selectedDate.isSame(loopMonth),
          }
        );
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
            title={loopMonth.format("YYYY-M-D")}
            onClick={(e) => {
              let cellDate = dayjs(e.currentTarget.title);

              if (calendarClick) {
                const date = cellDate.date();
                if (selectedDate.month() !== cellDate.month()) {
                  calendarClick(date, cellDate.month());
                } else {
                  calendarClick(date);
                }
              }
              // let month =
              //   selectedDate.month() !== cellDate.month()
              //     ? cellDate.month()
              //     : undefined;
              // calendarClick !== undefined &&
              //   calendarClick(cellDate.date(), month!);
            }}
          >
            {loopMonth.format("DD")}
          </Td>
        );
        loopMonth = loopMonth.add(1, "d");
      }
      monthElements.push(<Tr key={loopMonth.week()}>{currentWeekElements}</Tr>);
    } while (selectedDate.month() === loopMonth.month());
    return monthElements;
  }, [selectedDate]);

  return [monthElements, holidayImage, holidayHovered];
};
