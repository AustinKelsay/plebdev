import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import questionsReducer from "./questionsReducer";
import answersReducer from "./answersReducer";
import usersReducer from "./usersReducer";
import tagsReducer from "./tagsReducer";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    answers: answersReducer,
    users: usersReducer,
    tags: tagsReducer,
  },
  middleware: [thunk],
});
