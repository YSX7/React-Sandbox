import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogProps,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import React, { FC, ReactSVG, RefObject } from "react";

interface ChakraModalProps {
  children: ReactJSXElement;
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.MutableRefObject<any>;
}

const ChakraModal: FC<ChakraModalProps> = ({
  children,
  isOpen,
  onClose,
  cancelRef,
}) => {
  // const rootClasses = [classes.MyModal];
  // if (visible) {
  //   rootClasses.push(classes.active);
  // }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogFooter>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ChakraModal;
