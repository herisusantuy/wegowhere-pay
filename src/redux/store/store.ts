import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../slice/card";

const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
