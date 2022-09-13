import Calendar from "@/components/UI/calendar/Calendar";
import React, { ChangeEvent, FC, useState } from "react";
import Button from "@/components/UI/button/MyButton";
import MyModal from "@/components/UI/modal/MyModal";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  Button as ChakraButton,
} from "@chakra-ui/react";
import EventForm from "@/components/EventForm";
import dayjs, { Dayjs } from "dayjs";

type Props = {};

const Events: FC = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDateString, setSelectedDateString] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <React.Fragment>
      <Calendar setDate={setSelectedDateString} events={[]} />
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
              selectedDateString={selectedDateString}
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            />
          </DrawerBody>

          <DrawerFooter>
            <ChakraButton variant="outline" mr={3} onClick={onClose}>
              Cancel
            </ChakraButton>
            <Button colorScheme="blue" form="event-form" type="submit">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default Events;
