import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import FlipTransition from "../transitions/CalendarFlipTransition.module.css";

type Props = { children: ReactNode };

const TableCSSTransition: React.FC<Props> = ({ children, ...props }) => {
  return (
    <CSSTransition {...props} timeout={400} classNames={FlipTransition}>
      {children}
    </CSSTransition>
  );
};

export default TableCSSTransition;
