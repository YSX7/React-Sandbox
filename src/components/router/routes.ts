import About from "@/pages/About";
import Events from "@/pages/Events";
import Login from "@/pages/Login";
import Posts from "@/pages/Posts";
import Redux from "@/pages/Redux";
import Test from "@/pages/Test";
import React from "react";
import PostIdPage from "../PostIdPage";

interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const privateRoutes: IRoute[] = [
  { path: "/about", component: About },
  { path: "/posts", component: Posts },
  { path: "/posts/:id", component: PostIdPage },
  { path: "/test", component: Test },
  { path: "/redux", component: Redux },
  { path: "/events", component: Events },
];

export const publicRoutes: IRoute[] = [{ path: "/login", component: Login }];
