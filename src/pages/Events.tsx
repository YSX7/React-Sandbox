import Calendar from "@/components/UI/calendar/Calendar";
import { Box, Center, Portal } from "@chakra-ui/react";
import React, { FC } from "react";
import Button from "@/components/UI/button/MyButton";

type Props = {};

const Events: FC = (props: Props) => {
  return (
    <React.Fragment>
      <Calendar events={[]} />
      <Button m={"10px 0"}>Добавить событие</Button>
    </React.Fragment>
  );
};

export default Events;
