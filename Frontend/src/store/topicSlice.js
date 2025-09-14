// store/topicsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopics = createAsyncThunk(
  "topics/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/topics`);
      const { success, data, error } = await res.json();
      if (!success || error) {
        return thunkAPI.rejectWithValue(error || "Failed to fetch topics");
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedTopic: 'python', // <--- we can shange the selected topic
  },
  reducers: {
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
