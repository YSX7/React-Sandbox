import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useFormControlProps,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { ChangeEvent, FC, FormHTMLAttributes, useState } from "react";
import "./style.module.css";
import MySelect from "@/components/UI/select/MySelect";

interface EventProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  selectedDateString: string;
}

const EventForm: FC<EventProps> = ({ selectedDateString, ...props }) => {
  const [isInvalidEvent, setisInvalidEvent] = useState(false);

  return (
    <form {...props}>
      <FormControl isInvalid={isInvalidEvent} isRequired>
        <FormLabel>Описание</FormLabel>

        <Input
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            setisInvalidEvent(e.target.value === "");
          }}
          isInvalid={isInvalidEvent}
          isRequired
          placeholder="Сходить на день рождения"
        ></Input>
        {isInvalidEvent && (
          <FormErrorMessage>Требуется описание</FormErrorMessage>
        )}
        <FormLabel>Дата</FormLabel>
        <Input type="date" defaultValue={selectedDateString} />
        <FormLabel>Гость</FormLabel>
        <MySelect defaultValue="Выберите гостя" value="">
          <option>Иван Васильич Крузенштерн</option>
        </MySelect>
      </FormControl>
    </form>
  );
};

export default EventForm;
