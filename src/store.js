import { configureStore } from "@reduxjs/toolkit";
import dynamicFormSlice from "./dataSlice";

export const store = configureStore({
  reducer: {
    dynamicForm: dynamicFormSlice,
  },
});
