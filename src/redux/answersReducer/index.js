import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  answers: [],
  loading: false,
  isSuccess: false,
};

export const getAnswers = createAsyncThunk(
  "answers/getAnswers",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/answers/" + slug
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: {
    [getAnswers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAnswers.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.answers = action.payload;
    },
    [getAnswers.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

export default answersSlice.reducer;
