import type { AnyAction, AsyncThunkAction } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useThunkDispatch = () => {
  const dispatch = useDispatch();

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (action: AsyncThunkAction<any, any, any>) => {
      return dispatch(action as unknown as AnyAction);
    },
    [dispatch]
  );
};
