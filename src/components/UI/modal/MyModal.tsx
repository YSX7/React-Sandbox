import React, { FC, PropsWithChildren } from "react";
import classes from "./MyModal.module.css";
import cl from "classnames";

interface MyModalProps{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyModal: FC<PropsWithChildren<MyModalProps>> = ({ children, visible, setVisible }) => {
  const rootClasses = cl(classes.myModal, { [classes.active]: visible });
  // const rootClasses = [classes.MyModal];
  // if (visible) {
  //   rootClasses.push(classes.active);
  // }

  return (
    <div className={rootClasses} onClick={() => setVisible(false)}>
      <div
        className={classes.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;
