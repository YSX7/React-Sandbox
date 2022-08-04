import { useActions } from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import MyButton, { MyButtonVariant } from "../button/MyButton";
import Link from "../link/Link";

function Navbar() {
  const { isAuth, user } = useTypedSelector((state) => state.authReducer);
  const match = useMatch("/posts/:id");
  const navigate = useNavigate();
  const { logout } = useActions();

  return (
    <div className="navbar">
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
          <div className="navbar__items left">
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/test">Test counter</Link>
            <Link to="/redux">Redux</Link>
            <Link to="/events">Events</Link>
          </div>
          <div className="navbar__items right">
            <div className="login">{user.login}</div>
            <MyButton
              variant={MyButtonVariant.shadowed}
              onClick={() => logout()}
            >
              Logout
            </MyButton>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Navbar;
