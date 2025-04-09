import { ComponentType, lazy, LazyExoticComponent } from "react";

const ListPage = lazy(() => import("../../pages/ListPage"));
const SinglePage = lazy(() => import("../../pages/SinglePage"));

type RouteWithComponent = {
  path: string;
  Component: LazyExoticComponent<ComponentType<any>>;
};

export const routesConfig: RouteWithComponent[] = [
  {
    path: "/",
    Component: ListPage,
  },
  {
    path: "/:id",
    Component: SinglePage,
  },
];
