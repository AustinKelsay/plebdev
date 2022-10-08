import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import questionsReducer from "./questionsReducer";
import answersReducer from "./answersReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    answers: answersReducer,
    users: userReducer,
  },
  middleware: [thunk],
});
