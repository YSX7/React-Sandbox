import { useActions } from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import MyButton, { MyButtonVariant } from "../button/MyButton";
import Link from "../link/Link";
import classes from "./navbar.module.css";

function Navbar() {
  const { isAuth, user } = useTypedSelector((state) => state.authReducer);
  const match = useMatch("/posts/:id");
  const navigate = useNavigate();
  const { logout } = useActions();

  const navbarBg = useColorModeValue("gray.200", "gray.900");

  return (
    <Flex bg={navbarBg} className={classes.navbar}>
      {/* Если мы на странице с постом - рисуем бацк */}
      {match?.params?.id && (
        <MyButton
          variant={MyButtonVariant.rounded}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </MyButton>
      )}
      {isAuth && (
        <React.Fragment>
          <div className={classNames(classes.navbar__items, classes.left)}>
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/test">Test counter</Link>
            <Link to="/redux">Redux</Link>
            <Link to="/events">Events</Link>
          </div>
          <div className={classNames(classes.navbar__items, classes.right)}>
            <div className={classes.login}>{user.login}</div>
            <MyButton
              variant={MyButtonVariant.shadowed}
              onClick={() => logout()}
            >
              Logout
            </MyButton>
          </div>
        </React.Fragment>
      )}
    </Flex>
  );
}

export default Navbar;
