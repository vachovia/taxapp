import { configureStore } from "@reduxjs/toolkit";
import taxes from "./taxes";

const store = configureStore({
  reducer: {
    taxes,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
