import { ROUTES } from "@shared/lib/router";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

export const homeRoute: RouteObject = {
  path: ROUTES.HOME,
  Component: lazy(() => import("./ui")),
};
