import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import MySelect from "@/components/UI/select/MySelect";
import { IUser } from "@/models/IUser";

interface EventProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  selectedDateString: string;
  selectData: IUser[];
}

const EventForm: FC<EventProps> = ({
  selectedDateString,
  selectData,
  ...props
}) => {
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
          {selectData.map((elem) => (
            <option key={elem.login}>{elem.login}</option>
          ))}
        </MySelect>
      </FormControl>
    </form>
  );
};

export default EventForm;
