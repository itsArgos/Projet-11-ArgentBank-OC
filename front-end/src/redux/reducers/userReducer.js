import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../actions/user.action.js";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    logged: false,
    userProfile: null,
    errorMessage: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.logged = false;
      state.token = null;
      state.userProfile = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_SUCCESS, (state) => {
        state.logged = true;
      })
      .addCase(LOGIN_FAILED, (state, action) => {
        state.logged = false;
        state.errorMessage = action.payload;
      })
      .addCase(FETCH_PROFILE_SUCCESS, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(FETCH_PROFILE_FAILED, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
