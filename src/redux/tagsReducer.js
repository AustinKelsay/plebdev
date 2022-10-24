import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  taggedQuestionsCount: null,
  loading: false,
  isSuccess: false,
};

export const getQuestionsCount = createAsyncThunk(
  "tags/getQuestionsCount",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/tags/" + slug
      );
      // Just return the count for now
      return data.count;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: {
    [getQuestionsCount.pending]: (state, action) => {
      state.loading = true;
    },
    [getQuestionsCount.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.taggedQuestionsCount = action.payload;
    },
    [getQuestionsCount.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

export default tagsSlice.reducer;
