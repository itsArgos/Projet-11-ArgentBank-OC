// **** ETAT INITIAL ****
const initialState = {
    token: null,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    isLogged: false,
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            // Si l'action est de type LOGIN, on fusionne les données de l'action avec l'état actuel de l'utilisateur
            //et on met isLogged à true pour indiquer que l'utilisateur est connecté
            return { ...state, ...action.payload, isLogged: true }
        case 'IS_LOGGED':
            // Si l'action est de type IS_LOGGED, on met à jour l'état avec les données de l'action
            return { ...state, ...action.payload };
        case'EDIT_NAME':
        // Si l'action est de type EDIT_NAME, on met à jour le nom et le prénom de l'utilisateur dans l'état
            return { ...state, ...action.payload };
        case 'LOGOUT':
            // Si l'action est de type LOGOUT, on réinitialise l'état à son état initial (déconnecté)
            return initialState
        default:
            // Si l'action n'est pas reconnue, on retourne simplement l'état actuel sans le modifier
            return state
    }
}