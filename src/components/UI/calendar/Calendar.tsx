import { IEvent } from "@/models/IEvent";
import {
  Image,
  Button,
  Grid,
  GridItem,
  TableBodyProps,
} from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import classes from "./Calendar.module.css";
import FlipTransition from "./transitions/CalendarFlipTransition.module.css";
import "./transitions/CalendarSlideTransition.css";
import dayjs from "dayjs";
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "dayjs/locale/ru";
import Shoefootinskiy from "/september3.mp3";
import NavigationButton, {
  CalendarNavigationButtonType,
} from "./components/NavigationButton/NavigationButton";
import calendarFlipImage from "@/styles/calendarFlip.jpg";
import ListDays from "./components/ListDays/ListDays";
import TableCSSTransition from "./components/TableCSSTransition";
import ListMonths from "./components/ListMonths/ListMonths";
import objectSupport from "dayjs/plugin/objectSupport";
import ListYears from "./components/ListYears/ListYears";

type CalendarProps = { events: IEvent[] };

enum CalendarMode {
  Days = "Days",
  Months = "Months",
  Years = "Years",
}

const Calendar: FC<CalendarProps> = (props) => {
  const changeMonth = (changedMonthOffset: number) => {
    setSelectedDate(selectedDate.add(changedMonthOffset, "M"));
  };

  const changeYears = (offset: number) => {
    setSelectedDate(selectedDate.add(offset, "y"));
  };

  const changeDecades = (offset: number) => {
    setSelectedDate(selectedDate.add(offset * 10, "y"));
  };

  const [selectedDate, setSelectedDate] = useState(
    dayjs({ M: dayjs().month(), y: dayjs().year() })
  );
  const [isCalendarFlipped, setIsCalendarFlipped] = useState(false);
  const [calendarMode, setCalendarMode] = useState(CalendarMode.Days);
  const [isMoveLeft, setIsMoveLeft] = useState(false);
  let navButtonMethod = useCallback(
    (offset: number) => {
      setIsMoveLeft(offset < 0);
      // isMoveLeft = offset < 0;
      switch (calendarMode) {
        case CalendarMode.Days:
          changeMonth(offset);
          break;
        case CalendarMode.Months:
          changeYears(offset);
          break;
        case CalendarMode.Years:
          changeDecades(offset);
          break;
      }
    },
    [calendarMode, selectedDate]
  );

  const song = useMemo(() => {
    const song = new Audio(Shoefootinskiy);
    song.volume = 0.5;
    return song;
  }, []);

  const renderListElements = () => {
    switch (calendarMode) {
      case CalendarMode.Days:
        return (
          <TransitionGroup
            childFactory={(child) =>
              React.cloneElement(child, {
                classNames: isMoveLeft ? "left" : "right",
                timeout: 1000,
              })
            }
          >
            <CSSTransition
              timeout={1000}
              classNames="left"
              key={selectedDate.month()}
              // onEntered={(node: HTMLElement) => {
              //   node.className = "";
              // }}
            >
              <ListDays
                Wrapper={TableCSSTransition}
                isCalendarFlipped={isCalendarFlipped}
                selectedDate={selectedDate}
              />
            </CSSTransition>
          </TransitionGroup>
        );
      case CalendarMode.Months:
        return (
          <ListMonths
            Wrapper={TableCSSTransition}
            isCalendarFlipped={isCalendarFlipped}
            selectedDate={selectedDate}
            calendarClick={onMonthClick}
          />
        );
      case CalendarMode.Years:
        return (
          <ListYears
            Wrapper={TableCSSTransition}
            isCalendarFlipped={isCalendarFlipped}
            selectedDate={selectedDate}
            calendarClick={onYearClick}
          />
        );
      default:
        return (
          <ListDays
            Wrapper={TableCSSTransition}
            isCalendarFlipped={isCalendarFlipped}
            selectedDate={selectedDate}
          />
        );
    }
  };

  const onMonthClick = (newMonth: number) => {
    setSelectedDate(selectedDate.month(newMonth));
    setCalendarMode(CalendarMode.Days);
  };

  const onYearClick = (newYear: number) => {
    setSelectedDate(selectedDate.year(newYear));
    setCalendarMode(CalendarMode.Months);
  };

  return (
    <React.Fragment>
      <Grid templateColumns="1fr auto 1fr" className={classes.controls}>
        <GridItem></GridItem>
        <GridItem>
          <Button
            variant="link"
            onClick={() => setCalendarMode(CalendarMode.Months)}
          >
            {selectedDate.format("MMMM")}
          </Button>
          ,&nbsp;
          <Button
            variant="link"
            onClick={() => setCalendarMode(CalendarMode.Years)}
          >
            {selectedDate.format("YYYY")}
          </Button>
        </GridItem>
        <GridItem>
          <Button
            onClick={() => {
              setIsCalendarFlipped(!isCalendarFlipped);
              if (!isCalendarFlipped) song.play();
              else {
                song.currentTime = 0;
                song.pause();
              }
            }}
          >
            Перевернуть календарь
          </Button>
        </GridItem>
      </Grid>
      <div className={classes.parent} style={{ height: "100%" }}>
        <NavigationButton
          type={CalendarNavigationButtonType.Left}
          changeMonth={navButtonMethod}
        />
        <CSSTransition
          in={isCalendarFlipped}
          timeout={400}
          classNames={FlipTransition}
          unmountOnExit
        >
          <Image
            className={classes.calendarFlipImg}
            src={calendarFlipImage}
            alt="September 3"
          />
        </CSSTransition>
        {renderListElements()}
        <NavigationButton
          type={CalendarNavigationButtonType.Right}
          changeMonth={navButtonMethod}
        />
      </div>
    </React.Fragment>
  );
};

export default Calendar;
