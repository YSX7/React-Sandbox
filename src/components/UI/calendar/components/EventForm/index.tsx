import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {};

const EventForm: FC = (props: Props) => {
  return (
    <FormControl>
      <FormLabel>Описание события</FormLabel>
      <Input></Input>
    </FormControl>
  );
};

export default EventForm;
