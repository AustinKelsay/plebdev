import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  question: {},
  loading: false,
  isSuccess: false,
  questionsFilter: "newest",
};

export const getQuestion = createAsyncThunk(
  "questions/getQuestion",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/questions/" + slug
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const tipQuestion = createAsyncThunk(
  "questions/upvote",
  async ({ slug, tip }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/questions/" + slug,
        { score: tip }
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestionsFilter: (state, action) => {
      state.questionsFilter = action.payload;
    },
  },
  extraReducers: {
    [getQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [getQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.question = action.payload;
    },
    [getQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [tipQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [tipQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
    },
    [tipQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

export const { setQuestionsFilter } = questionsSlice.actions;

export default questionsSlice.reducer;
