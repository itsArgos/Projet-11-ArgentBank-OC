// ACTIONS
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILED = 'FETCH_PROFILE_FAILED';


// Action de connexion réussie
function loginSuccess() {
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
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/profile`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            // Si la connexion réussie
            if (response.status === 200) {
                const userProfile = await response.json();
                dispatch({ type: FETCH_PROFILE_SUCCESS, payload: userProfile });
            } else {
                dispatch({ type: FETCH_PROFILE_FAILED, payload: 'Failed to fetch user profile' }); 
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            dispatch({ type: FETCH_PROFILE_FAILED, payload: 'An error occurred while fetching user profile' });
        }
    };
}

// Fonction d'authentification utilisateur
export function userLogin(email, password, navigate) {
    return async function (dispatch) {
        
        const userData = { email, password };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            
            // Si la connexion réussie
            if (response.status === 200) {
                navigate('/Profile');
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







// INFORMATIONS PROFIL UTILISATEURS
export async function userProfile(token) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

// EDIT NAME
export async function userEditProfile(token, username) {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/profile`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            userName: username,
        }),
    });
    return await response.json();
}