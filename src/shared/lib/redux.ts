import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { DataRouter } from "react-router-dom";

export type AppThunkDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
export const useThunkDispatch = () => useDispatch<AppThunkDispatch>();

export const isThunkExtra = (
  extra: unknown
): extra is {
  router: DataRouter;
  notifications: typeof import("@mantine/notifications").notifications;
} => {
  return (
    typeof extra === "object" &&
    extra !== null &&
    "router" in extra &&
    "notifications" in extra
  );
};
