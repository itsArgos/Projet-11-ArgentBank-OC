import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOAD_PROFILE_TERMINATED,
} from "../actions/user.action.js";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loadProfileTerminated: false,
    logged: false,
    userProfile: null,
    errorMessage: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.loadProfileTerminated = false;
      state.logged = false;
      state.userProfile = null;
      state.errorMessage = null;
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
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
      .addCase(LOAD_PROFILE_TERMINATED, (state) => {
        state.loadProfileTerminated = true;
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
