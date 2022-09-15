import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import MySelect from "@/components/UI/select/MySelect";
import { IUser } from "@/models/IUser";
import { IEvent } from "@/models/IEvent";
import { InvalidEvent } from "./types";

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
  const [invalidEvent, setInvalidEvent] = useState<InvalidEvent>(
    new InvalidEvent({})
  );

  function onBlur(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInvalidEvent((prevState) => {
      return new InvalidEvent({
        ...prevState,
        [e.target.name]: e.target.value === "",
      });
    });
  }

  return (
    <form {...props}>
      <FormControl isInvalid={invalidEvent.isInvalid()} isRequired>
        <FormLabel>Описание</FormLabel>

        <Input
          name="description"
          // onBlur={(e: ChangeEvent<HTMLInputElement>) => {
          //   setInvalidEvent((prevState) => {
          //     return new InvalidEvent({
          //       ...prevState,
          //       description: e.target.value === "",
          //     });
          //   });
          // }}
          onBlur={onBlur}
          isInvalid={invalidEvent.description}
          isRequired
          placeholder="Сходить на день рождения"
          value={event.description}
          onChange={(e) =>
            setEvent((prevState) => {
              return { ...prevState, description: e.target.value };
            })
          }
        ></Input>
        {invalidEvent.description && (
          <FormErrorMessage>Требуется описание</FormErrorMessage>
        )}
        <FormLabel>Дата</FormLabel>
        <Input
          name="date"
          onBlur={onBlur}
          type="date"
          value={event.date}
          isInvalid={invalidEvent.date}
          isRequired
          onChange={(e) =>
            setEvent((prevState) => {
              return { ...prevState, date: e.target.value };
            })
          }
        />
        {invalidEvent.date && (
          <FormErrorMessage>Выберите валидную дату</FormErrorMessage>
        )}
        <FormLabel>Гость</FormLabel>
        <MySelect
          name="guest"
          onBlur={onBlur}
          defaultValue="Выберите гостя"
          isInvalid={invalidEvent.guest}
          value={event.guest}
          isRequired
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
        {invalidEvent.guest && (
          <FormErrorMessage>Выберите гостя, дорогой господин</FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
};

export default EventForm;
