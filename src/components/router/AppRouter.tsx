import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Error from "@/pages/Error";
import { privateRoutes, publicRoutes } from "./routes";
import { AuthContext, AuthContextType } from "@/context";
import Spinner from "../UI/spinner/spinner";
import useTypedSelector from "@/hooks/useTypedSelector";

const AppRouter = () => {
  const { isAuth, isLoading } = useTypedSelector((state) => state.authReducer);
  //const useAuthContext: AuthContextType = useContext(AuthContext);

  console.log(`${isAuth} |  ${window.location.href}`);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Routes>
      {/* {useAuthContext.isAuth ? ( */}
      {isAuth ? (
        <React.Fragment>
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="/login" element={<Navigate to="/posts" replace />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </React.Fragment>
      )}
      <Route path="/error" element={<Error />} />
      <Route path="/" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
};

export default AppRouter;
