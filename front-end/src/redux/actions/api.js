// ACTIONS
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILED = "FETCH_PROFILE_FAILED";

// Action de connexion réussie
export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

// Action de connexion échouée
function loginFailed(errorMessage) {
  return { type: LOGIN_FAILED, payload: errorMessage };
}

// Action pour récupérer le profil utilisateur
function fetchProfile() {
  return async function (dispatch) {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/user/profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Si la connexion réussie
      if (response.status === 200) {
        const userProfile = await response.json();
        dispatch({ type: FETCH_PROFILE_SUCCESS, payload: userProfile });
      } else {
        dispatch({
          type: FETCH_PROFILE_FAILED,
          payload: "Failed to fetch user profile",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      dispatch({
        type: FETCH_PROFILE_FAILED,
        payload: "An error occurred while fetching user profile",
      });
    }
  };
}

// Fonction d'authentification utilisateur
export function userLogin(email, password, rememberMe, navigate) {
  return async function (dispatch) {
    const userData = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      const token = data.body.token;

      // Si la connexion réussie
      if (response.status === 200) {
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        navigate("/Profile");
        dispatch(loginSuccess());
        dispatch(fetchProfile());
      } else {
        dispatch(loginFailed("Invalid email or password"));
      }
    } catch (error) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      dispatch(loginFailed("An error occurred while trying to log in"));
      console.log("An error occurred while trying to log in:", error);
    }
  };
}

