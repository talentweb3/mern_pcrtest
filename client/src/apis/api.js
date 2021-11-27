import axios from 'axios';
import https from 'https';

import variable from '../config.js';
const { DB_ROUTE } = variable;

const Api = axios.create({ baseURL: DB_ROUTE });
Api.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
})

export const login = (userData) => Api.post('/api/v1/user/login', userData);
export const signup = (userData) => Api.post('/api/v1/user/signup', userData);
export const updateMe = (userData) => Api.patch('/api/v1/user/updateMe', userData);
export const updatePassword = (userData) => Api.patch('/api/v1/user/updatePassword', userData);
export const forgotPassword = (userData) => Api.patch('/api/v1/user/forgotPassword', userData);
export const resetPassword = (userData, token) => Api.patch(`/api/v1/user/resetPassword/${token}`, userData);

export const getUsers = () => Api.get(`/api/v1/user/getUsers`);
export const updateUser = (id, userData) => Api.put(`/api/v1/user/updateUser/${id}`, userData);
export const addUser = (userData) => Api.post(`/api/v1/user/addNewUser`, userData);
export const deleteUser = (id) => Api.delete(`/api/v1/user/deleteUser/${id}`);

export const addNewInfo = (userInfo) => Api.post('/api/v1/apply/addNewInfo', userInfo);
export const getProposals = () => Api.get('/api/v1/apply/getProposals');
export const updateProposal = (id, data) => Api.put(`/api/v1/apply/updateProposal/${id}`, data);
export const deleteProposal = (id) => Api.delete(`/api/v1/apply/deleteProposal/${id}`);
export const getApproved = (id) => Api.put(`/api/v1/apply/approved/${id}`);
export const getDeclined = (id) => Api.put(`/api/v1/apply/declined/${id}`);
export const viewRequest = (id) => Api.post('/api/v1/apply/viewRequest', id);
export const sendMail = (id) => Api.post('/api/v1/apply/sendMail',id);