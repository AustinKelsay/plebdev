import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  question: {},
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestion: (state, action) => {
      axios
        .get(`http://localhost:3000/api/questions/${action.payload}`)
        .then((res) => {
          state.question = res.data;
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteQuestion: (state, action) => {
      axios
        .delete(`http://localhost:3000/api/questions/${action.payload}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const { getQuestion, deleteQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
