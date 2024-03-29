import { IEvent } from "@/models/IEvent";
import {
  Image,
  Grid,
  GridItem,
  Container,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";
import classes from "./Calendar.module.css";
import "./transitions/CalendarFlipTransition.css";
import "./transitions/CalendarSlideTransition.css";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useCallback, useMemo, useState } from "react";
import "dayjs/locale/ru";
import Shoefootinskiy from "/september3.mp3";
import NavigationButton, {
  CalendarNavigationButtonType,
} from "./components/NavigationButton/NavigationButton";
import calendarFlipImage from "./calendarFlip.jpg";
import ListDays from "./components/ListDays/ListDays";
import TableCSSTransition from "./components/TableCSSTransition";
import ListMonths from "./components/ListMonths/ListMonths";
import ListYears from "./components/ListYears/ListYears";
import {
  animated,
  easings,
  useTransition,
  UseTransitionProps,
} from "react-spring";
import Status from "./components/Status/Status";
import { CalendarMode, RenderFunction } from "./types";
import Button from "@/components/UI/button/MyButton";
import Images from "./components/ListDays/Holidays";
import { useEffect } from "react";
import ListRender from "./components/ListRender";
import {
  useScrollTransition,
  useZoomTransition,
} from "./components/transitions";

type CalendarProps = {
  setDateForEvent: React.Dispatch<React.SetStateAction<string>>;
  events: IEvent[];
  dateCellRender?: RenderFunction;
  monthYearCellRender?: RenderFunction;
};

const Calendar: FC<CalendarProps> = ({ setDateForEvent, ...props }) => {
  const changeMonth = (offset: number) => {
    setSelectedDate(selectedDate.add(offset, "M"));
  };

  const changeYears = (offset: number) => {
    setSelectedDate(selectedDate.add(offset, "y"));
  };

  const changeDecades = (offset: number) => {
    setSelectedDate(selectedDate.add(offset * 10, "y"));
  };

  const [selectedDate, setSelectedDate] = useState(
    dayjs({ M: dayjs().month(), y: dayjs().year(), d: dayjs().date() })
  );
  const [isCalendarFlipped, setIsCalendarFlipped] = useState(false);
  const [calendarMode, setCalendarMode] = useState(CalendarMode.Days);
  const [setIsMoveLeft, scrollTransition] = useScrollTransition(selectedDate);
  const [setIsZoomIn, zoomTransition] = useZoomTransition(CalendarMode.Days);
  const [isScrolling, setIsScrolling] = useState(false);

  let navButtonMethod = useCallback(
    (offset: number) => {
      setIsMoveLeft(offset < 0);
      setIsScrolling(true);
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

  const renderListElements = (calendarArg?: CalendarMode) => {
    switch (calendarArg ? calendarArg : calendarMode) {
      case CalendarMode.Days:
        return (
          <ListDays
            Wrapper={TableCSSTransition}
            isCalendarFlipped={isCalendarFlipped}
            selectedDate={selectedDate}
            calendarClick={onDayClick}
            dateCellRender={props.dateCellRender}
          />
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
    }
  };

  const onDayClick = (newDay: number, newMonth?: number) => {
    setSelectedDate(
      newMonth
        ? selectedDate.month(newMonth).date(newDay)
        : selectedDate.date(newDay)
    );
    setIsScrolling(false);
  };

  const onMonthClick = (newMonth: number) => {
    setSelectedDate(selectedDate.month(newMonth));
    setCalendarMode(CalendarMode.Days);
    setIsScrolling(false);
    setIsZoomIn(false);
  };

  const onYearClick = (newYear: number) => {
    setSelectedDate(selectedDate.year(newYear));
    setCalendarMode(CalendarMode.Months);
    setIsScrolling(false);
    setIsZoomIn(false);
  };

  useEffect(() => {
    setDateForEvent(selectedDate.format("YYYY-MM-DD"));
  }, [selectedDate]);

  return (
    <Box className={classes.container}>
      <Grid templateColumns="1fr auto 1fr" className={classes.controls}>
        <GridItem></GridItem>
        <GridItem>
          <Status
            calendarMode={calendarMode}
            onMonthClick={() => {
              setIsScrolling(false);
              setCalendarMode(CalendarMode.Months);
              setIsZoomIn(true);
            }}
            onYearClick={() => {
              setIsScrolling(false);
              setCalendarMode(CalendarMode.Years);
              setIsZoomIn(true);
            }}
          >
            {selectedDate}
          </Status>
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
          {/* <Button>Test</Button> */}
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
          classNames="flip"
          unmountOnExit
        >
          <Image
            className={classes.calendarFlipImg}
            src={calendarFlipImage}
            alt="September 3"
          />
        </CSSTransition>

        {zoomTransition((zoomStyles, zoomItem, zt) => {
          return isScrolling ? (
            scrollTransition((styles, item, t) => {
              return (
                <animated.div
                  className={classes.animatedDiv}
                  style={isScrolling ? styles : zoomStyles}
                >
                  {renderListElements(zoomItem as CalendarMode)}
                </animated.div>
              );
            })
          ) : (
            <animated.div className={classes.animatedDiv} style={zoomStyles}>
              {renderListElements(zoomItem as CalendarMode)}
            </animated.div>
          );
        })}

        {/* {zoomTransition((zoomStyles, zoomItem, zt) => {
          return isScrolling ? (
            scrollTransition((styles, item, t) => {
              return (
                <animated.div
                  className={classes.animatedDiv}
                  style={isScrolling ? styles : zoomStyles}
                >
                  {
                    <ListRender
                      Wrapper={TableCSSTransition}
                      isCalendarFlipped={isCalendarFlipped}
                      selectedDate={selectedDate}
                      calendarClick={onDayClick}
                      calendarMode={calendarMode}
                    />
                  }
                </animated.div>
              );
            })
          ) : (
            <animated.div className={classes.animatedDiv} style={zoomStyles}>
              {
                <ListRender
                  Wrapper={TableCSSTransition}
                  isCalendarFlipped={isCalendarFlipped}
                  selectedDate={selectedDate}
                  calendarClick={onDayClick}
                  calendarMode={calendarMode}
                />
              }
            </animated.div>
          );
        })} */}

        <NavigationButton
          type={CalendarNavigationButtonType.Right}
          changeMonth={navButtonMethod}
        />
      </div>
    </Box>
  );
};

export default Calendar;
