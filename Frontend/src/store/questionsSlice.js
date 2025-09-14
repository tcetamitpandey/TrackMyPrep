import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuestionsByTopic = createAsyncThunk(
  "questions/fetchByTopic", // thunk name it will be used as a prefix for our API call as pending, fulfilled or rejected state // this name when added with prefix  let our state what stage of api call it is handling // eg when someone call this state and its status is still pending it will send differnt response and same for other states as well means if STATE is rejected send rend different response // id state is fulfilled send the main item which was asked and is given by api call

  // NOTE:
// "questions/fetchByTopic" is the base action type (prefix) for this async thunk.
// Redux Toolkit will automatically generate 3 action types from it:
//   - questions/fetchByTopic/pending   → when the API request starts
//   - questions/fetchByTopic/fulfilled → when the API request succeeds
//   - questions/fetchByTopic/rejected  → when the API request fails
//
// In extraReducers, we handle each of these cases to update the Redux state.
//   - pending   → set loading state (e.g. status = "loading")
//   - fulfilled → save the fetched data (e.g. status = "succeeded")
//   - rejected  → save the error (e.g. status = "failed")
//
// The UI can then read this state to decide what to render
// (loading spinner, error message, or the fetched data).



  async (topic, thunkAPI) => {
    try {
      const url_link = `${import.meta.env.VITE_REACT_APP_API_URL}/api/questions/collections/${topic.replaceAll(" ","_")}`;

      const response = await fetch(url_link, { method: "GET" });
      const { success, data, error } = await response.json();

      if (!success || error) {
        return thunkAPI.rejectWithValue(error || "Failed to fetch questions");
      }

      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const questionsSlice = createSlice({
  name: "questionsData",
  initialState: {
    itemsByTopic: {},     
    loading: false,
    error: null,
  },
  reducers: {}, // empty since we dont want to mutate the questions once fetched 
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsByTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsByTopic.fulfilled, (state, action) => {
        state.loading = false;
        const topic = action.meta.arg
        state.itemsByTopic[topic] = action.payload;
      })
      .addCase(fetchQuestionsByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default questionsSlice.reducer;



/*

fetchQuestionsByTopic : its just Async Thuk function jo batayga Api call success tha fail hua ya reject // when we call this function it will handle the Async fetch and tell the redux its result 

questionsSlice : its just a Slice defination ( its a bundle )
a name ("questionsData")
an initial state
reducers (your own sync logic)
extraReducers (logic for handling thunks and other external actions)

This "questionsData" is just the key in your Redux state tree.


fetchQuestionsByTopic → async thunk action creator

questionsSlice → the slice definition (contains state + reducers + extraReducers)

questionsSlice.reducer → the reducer function you give to the store

questionsData → the name/key of the state slice inside the global Redux store

 */