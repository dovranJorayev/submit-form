import { MantineProvider } from "@mantine/core";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  submitFormName,
  submitFormReducer,
  SubmitPage,
} from "./pages/submit-page";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./shared/api/mocks/browser");
  await worker.start();
}

const store = configureStore({
  reducer: {
    [submitFormName]: submitFormReducer,
  },
});

export function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <SubmitPage />
      </MantineProvider>
    </Provider>
  );
}
