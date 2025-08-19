import { ROUTES } from "@shared/lib/router";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

export const submitRoute: RouteObject = {
  path: ROUTES.SUBMIT,
  Component: lazy(() => import("./ui")),
};
