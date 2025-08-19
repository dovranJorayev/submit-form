import { MantineProvider } from "@mantine/core";
import { notifications, Notifications } from "@mantine/notifications";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeRoute } from "./pages/home/route";
import { submitFormName, submitFormReducer, submitRoute } from "./pages/submit";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./shared/api/mocks/browser");
  await worker.start();
}

const router = createBrowserRouter([homeRoute, submitRoute]);

const store = configureStore({
  reducer: {
    [submitFormName]: submitFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          router,
          notifications,
        },
      },
    }),
});

export function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Notifications position="top-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  );
}
