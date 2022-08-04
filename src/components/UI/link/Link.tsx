import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  to: string;
};

const Link = (props: Props) => {
  return (
    <ChakraLink
      as={RouterLink}
      to={props.to}
      /* activeClassName="navbar_item_active" */ _activeLink={{
        fontWeight: "bold",
        color: "teal",
      }}
    >
      {props.children}
    </ChakraLink>
  );
};

export default Link;
