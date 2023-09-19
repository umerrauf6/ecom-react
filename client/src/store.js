import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./features/slice";

export const store = configureStore({
  reducer: { counter: stateSlice },
});
