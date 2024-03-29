// ACTIONS
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILED = "FETCH_PROFILE_FAILED";
export const LOAD_PROFILE_TERMINATED = "LOAD_PROFILE_TERMINATED";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

// Action de connexion réussie
export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

// Action de connexion échouée
function loginFailed(errorMessage) {
  return { type: LOGIN_FAILED, payload: errorMessage };
}

// Action pour récupérer le profil utilisateur
export function fetchProfile() {
  return async function (dispatch) {
    try {
      const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        dispatch({type: "LOAD_PROFILE_TERMINATED"});
        return;
      }
      
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
          dispatch({ type: FETCH_PROFILE_SUCCESS, payload: userProfile.body });
          dispatch(loginSuccess())
        } else {
          dispatch({
            type: FETCH_PROFILE_FAILED,
            payload: "Failed to fetch user profile",
          });
        }
        dispatch({type: "LOAD_PROFILE_TERMINATED"});
      } catch (error) {
        console.error("Error fetching user profile:", error);
        dispatch({
          type: FETCH_PROFILE_FAILED,
          payload: "An error occurred while fetching user profile",
        });
        dispatch({type: "LOAD_PROFILE_TERMINATED"});
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
          const errorMessage = "Invalid email or password"
          
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
            dispatch(loginFailed(errorMessage));
          }
        } catch (error) {
          const errorMessage = "Invalid email or password"
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          dispatch(loginFailed(errorMessage));
          alert("Invalid email or password", error);
        }
      };
    }

    
// Fonction pour changer le nom d'utilisateur
export function putNewUserName(newUserName) {
  return async function(dispatch) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    // Si un token n'est trouvé dans aucun des deux, arrête la fonction
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: newUserName
        })
      });

      // Si la réponse de la requête est réussie
      if (response.status === 200) {
        const data = await response.json();
        // Dispatch de l'action pour mettre à jour le profil dans le store
        dispatch({
          type: UPDATE_PROFILE,
          payload: data.body,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
