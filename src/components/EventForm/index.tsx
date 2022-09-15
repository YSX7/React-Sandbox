import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import MySelect from "@/components/UI/select/MySelect";
import { IUser } from "@/models/IUser";
import { IEvent } from "@/models/IEvent";

interface EventProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  event: IEvent;
  setEvent: React.Dispatch<React.SetStateAction<IEvent>>;
  selectData: IUser[];
}

const EventForm: FC<EventProps> = ({
  event,
  setEvent,
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
          value={event.description}
          onChange={(e) =>
            setEvent((prevState) => {
              return { ...prevState, description: e.target.value };
            })
          }
        ></Input>
        {isInvalidEvent && (
          <FormErrorMessage>Требуется описание</FormErrorMessage>
        )}
        <FormLabel>Дата</FormLabel>
        <Input
          type="date"
          value={event.date}
          onChange={(e) =>
            setEvent((prevState) => {
              return { ...prevState, date: e.target.value };
            })
          }
        />
        <FormLabel>Гость</FormLabel>
        <MySelect
          defaultValue="Выберите гостя"
          value={event.guest}
          onChange={(e) =>
            setEvent((prevEvent) => {
              return { ...prevEvent, guest: e.target.value };
            })
          }
        >
          {selectData.map((elem) => (
            <option key={elem.login}>{elem.login}</option>
          ))}
        </MySelect>
      </FormControl>
    </form>
  );
};

export default EventForm;
