import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import "../transitions/CalendarFlipTransition.css";

type Props = { children: ReactNode };

const TableCSSTransition: React.FC<Props> = ({ children, ...props }) => {
  return (
    <CSSTransition {...props} timeout={400} classNames="flip">
      {children}
    </CSSTransition>
  );
};

export default TableCSSTransition;
