import Calendar from "@/components/UI/calendar/Calendar";
import { Box, Portal } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {};

const Events: FC = (props: Props) => {
  return <Calendar events={[]} />;
};

export default Events;
