import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sent: [],
  received: [],
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setSentRequests: (state, action) => {
      state.sent = action.payload;
    },
    setReceivedRequests: (state, action) => {
      state.received = action.payload;
    },
  },
});

export const { setSentRequests, setReceivedRequests } = requestSlice.actions;
export default requestSlice.reducer;
