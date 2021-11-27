import { AUTH, LOGOUT, UPDATE_ME, GET_USERLIST, UPDATE_USER, ADD_NEWUSER } from '../constants/userConstants';

export const userReducer = (state = { user: {}, users: [] }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state };
        case UPDATE_ME:
            let profile = JSON.parse(localStorage.getItem('profile'));
            profile.userData = action.payload.userData;
            localStorage.setItem("profile", JSON.stringify(profile));
            return { ...state, user: action.payload }
        case GET_USERLIST:
            return {...state, users: action.payload}
        
        default: return state;
    }
}