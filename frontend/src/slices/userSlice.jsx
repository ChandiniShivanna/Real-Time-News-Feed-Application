import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptions: [], // e.g., ['Tech', 'Sports']
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    subscribeCategory: (state, action) => {
      if (!state.subscriptions.includes(action.payload)) {
        state.subscriptions.push(action.payload);
      }
    },
    unsubscribeCategory: (state, action) => {
      state.subscriptions = state.subscriptions.filter(
        (cat) => cat !== action.payload
      );
    },
  },
});

export const { subscribeCategory, unsubscribeCategory } = userSlice.actions;
export default userSlice.reducer;
