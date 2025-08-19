import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export type AppThunkDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
export const useThunkDispatch = () => useDispatch<AppThunkDispatch>();
