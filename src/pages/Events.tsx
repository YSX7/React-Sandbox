import Calendar from "@/components/UI/calendar/Calendar";
import React, { FC, useState } from "react";
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
import EventForm from "@/components/UI/calendar/components/EventForm";

type Props = {};

const Events: FC = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <Calendar events={[]} />
      <Button m={"10px 0"} onClick={onOpen}>
        Добавить событие
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Добавьте ваше событие</DrawerHeader>

          <DrawerBody>
            <EventForm />
          </DrawerBody>

          <DrawerFooter>
            <ChakraButton variant="outline" mr={3} onClick={onClose}>
              Cancel
            </ChakraButton>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default Events;
