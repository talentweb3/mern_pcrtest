import * as api from '../apis/api';
import { message } from '../utils/message';

import { 
    AUTH,
    UPDATE_ME,
    SUCCESS,
    ERROR,
    INFO,
    GET_USERLIST,
} from '../constants/userConstants';


import { Alert } from '../utils/Alert';

export const login = (userData, history) => async (dispatch) => {
    try {
        const { data } = await api.login(userData);
        dispatch({ type: AUTH, payload: data });
        Alert(SUCCESS, "Login successfull!");
        history.push('/main');
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const signup = (userData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(userData);
        dispatch({ type: AUTH, payload: data });
        Alert(SUCCESS, "Signup successfull!");
        history.push('/main');
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const updateMe = (userData) => async (dispatch) => {
    try {
    
        Alert(INFO, "Please wait! Your data is processed...");
        const { data } = await api.updateMe(userData);

        dispatch({ type: UPDATE_ME, payload: data });
        Alert(SUCCESS, "Update successfull!");
    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const updatePassword = (userData) => async (dispatch) => {
    try {
        const { data } = await api.updatePassword(userData);
        dispatch({ type: AUTH, payload: data });
        Alert(SUCCESS, "updatePassword successfull!");

    } catch (error) {
        Alert(ERROR, error.response.data.message);
    }
}

export const forgotPassword = (userData) => async (dispatch) => {

    try {
        Alert(INFO, "Please wait! Your data is processed...");
        await api.forgotPassword(userData);
        Alert(SUCCESS, "Token send to your email");
    } catch (error) {
        Alert(ERROR, "Token Error");
    }
}

export const resetPassword = (userData, token, history) => async (dispatch) => {
    try {
        await api.resetPassword(userData, token);
        Alert(SUCCESS, "password reset successful");
        history.push('/user/login');
    } catch (error) {
        Alert(ERROR, "Error");
    }
}

export const getUserList = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: GET_USERLIST, payload: data });
    } catch (error) {
        Alert(ERROR, "get user data Error");
    }
}

export const addNewUser = (userData) => async (dispatch) => {
    try {
        await api.addUser(userData);
        dispatch(getUserList());
        message('success', 'Add new user successfully.', dispatch);
    } catch (error) {
        message('success', 'Could not add user!', dispatch);
    }
}

export const updateUser = (oldDataId, userData) => async (dispatch) => {
    try {
        await api.updateUser(oldDataId, userData)
        dispatch(getUserList());
        message('success', 'User is updated successfully', dispatch);
    } catch (error) {
        message('error', 'Could not update user!', dispatch);
    }
}

export const deleteUser = (oldData) => async (dispatch) => {
    try {
        await api.deleteUser(oldData._id);
        dispatch(getUserList());
        message('success', 'User is deleted successfully.', dispatch);
    } catch (error) {
        message('error', 'Could not delete user!', dispatch);
    }
}

