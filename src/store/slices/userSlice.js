import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    setUserToken: (state, action) => {
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { logout, setAuthUser, setUserToken } = userSlice.actions;

export default userSlice.reducer;
