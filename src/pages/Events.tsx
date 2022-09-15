import Calendar from "@/components/UI/calendar/Calendar";
import React, { FC, useEffect, useState } from "react";
import Button from "@/components/UI/button/MyButton";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button as ChakraButton,
} from "@chakra-ui/react";
import EventForm from "@/components/EventForm";
import dayjs from "dayjs";
import { useActions } from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";
import { IEvent } from "@/models/IEvent";

type Props = {};

const Events: FC = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fetchGuests } = useActions();
  const guests = useTypedSelector((state) => state.eventReducer.guests);
  const currentUser = useTypedSelector((state) => state.authReducer.user.login);
  const [selectedDate, setselectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <React.Fragment>
      <Calendar setDateForEvent={setselectedDate} events={[]} />
      <Button m={"10px 0"} onClick={onOpen}>
        Добавить событие
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Добавьте ваше событие</DrawerHeader>

          <DrawerBody>
            <EventForm
              id="event-form"
              author={currentUser}
              selectData={guests}
              selectedDate={selectedDate}
              // submit={(e) => {
              //   setEvent((prevState) => {
              //     return { ...prevState, author: currentUser };
              //   });
              // }}
            />
          </DrawerBody>

          <DrawerFooter>
            <ChakraButton variant="outline" mr={3} onClick={onClose}>
              Отмена
            </ChakraButton>
            <Button colorScheme="blue" form="event-form" type="submit">
              Добавить
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default Events;
