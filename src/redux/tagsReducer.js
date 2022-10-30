import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  taggedQuestionsCount: null,
  loading: false,
  isSuccess: false,
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default tagsSlice.reducer;
