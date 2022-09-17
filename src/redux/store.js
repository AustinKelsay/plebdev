import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import questionsReducer from "./questionsReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    users: userReducer,
  },
  middleware: [thunk],
});
