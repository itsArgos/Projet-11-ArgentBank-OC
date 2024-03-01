import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../actions/api";

// Crée un slice pour gérer l'état de l'utilisateur dans le store Redux
export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    token: null,
    logged: false,
    userProfile: null,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducer pour la connexion réussie
      .addCase(LOGIN_SUCCESS, (state) => {
        state.logged = true; // Met à jour l'état pour indiquer que l'utilisateur est connecté
        state.errorMessage = null; // Réinitialise le message d'erreur
      })
      // Reducer pour la connexion échouée
      .addCase(LOGIN_FAILED, (state, action) => {
        state.logged = false; // Met à jour l'état pour indiquer que la connexion a échoué
        state.errorMessage = action.payload; // Enregistre le message d'erreur fourni dans l'action
      })
      // Reducer pour le chargement réussi du profil utilisateur
      .addCase(FETCH_PROFILE_SUCCESS, (state, action) => {
        state.userProfile = action.payload; // Met à jour le profil utilisateur avec les données fournies dans l'action
      })
      // Reducer pour le chargement échoué du profil utilisateur
      .addCase(FETCH_PROFILE_FAILED, (state, action) => {
        state.errorMessage = action.payload; // Enregistre le message d'erreur fourni dans l'action
      });
  },
});
