import Calendar from "@/components/UI/calendar/Calendar";
import { Box, Center, Portal } from "@chakra-ui/react";
import React, { FC } from "react";
import Button from "@/components/UI/button/MyButton";

type Props = {};

const Events: FC = (props: Props) => {
  return (
    <React.Fragment>
      <Calendar events={[]} />
      <Button style={{ marginBottom: "10px" }}>Добавить событие</Button>
    </React.Fragment>
  );
};

export default Events;
