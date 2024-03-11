import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOAD_PROFILE_TERMINATED,
  UPDATE_PROFILE,
} from "../actions/user.action.js";

export const userSlice = createSlice({
  name: "user",
  // État initial
  initialState: {
    loadProfileTerminated: false, // Indique si le chargement du profil est terminé
    logged: false, // Indique si l'utilisateur est connecté
    userProfile: null, // Profil de l'utilisateur
    errorMessage: null, // Message d'erreur en cas de problème
  },
  // Définition des réducteurs pour gérer les actions
  reducers: {
    // Réducteur pour déconnecter l'utilisateur
    logoutUser: (state) => {
      state.loadProfileTerminated = false;
      state.logged = false;
      state.userProfile = null;
      state.errorMessage = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
    // Réducteur pour gérer le succès de la connexion
      .addCase(LOGIN_SUCCESS, (state) => {
        state.logged = true;
        state.errorMessage = null;
      })
      // Réducteur pour gérer l'échec de la connexion
      .addCase(LOGIN_FAILED, (state, action) => {
        state.logged = false;
        state.errorMessage = action.payload;
      })
      // Réducteur pour marquer le chargement du profil comme terminé
      .addCase(LOAD_PROFILE_TERMINATED, (state) => {
        state.loadProfileTerminated = true;
      })
      // Réducteur pour gérer le succès de la récupération du profil
      .addCase(FETCH_PROFILE_SUCCESS, (state, action) => {
        state.userProfile = action.payload;
      })
      // Réducteur pour gérer l'échec de la récupération du profil
      .addCase(FETCH_PROFILE_FAILED, (state, action) => {
        state.errorMessage = action.payload;
      })
      // Réducteur pour gérer la mise à jour du profil utilisateur
      .addCase(UPDATE_PROFILE, (state, action) => {
        state.userProfile = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
