import * as api from '../apis/api.js';
import { GET_PROPOSALS_SUCCESS } from '../constants/applyConstant.js';
import variable from '../config.js';
import { message } from '../utils/message';


export const addUserInfo = (userInfo) => async (dispatch) => {
    try {
        await api.addNewInfo(userInfo);
        message('success', 'Success, please waiting the result', dispatch);
    } catch (error) {
        message('error', 'Could not add new user!', dispatch);
    }
}

export const getProposalList = () => async (dispatch) => {
    try {
        const { data } =  await api.getProposals();
        dispatch({ type: GET_PROPOSALS_SUCCESS, payload: data });
    } catch (error) {
        message('error', 'Could not see proposals!', dispatch);
    }
}

export const setApproved = () => async (dispatch) => {
    try {
        await api.addNewInfo();
        message('success', 'success, please see proposal page', dispatch);
    } catch (error) {
        message('error', 'Could not approved', dispatch);
    }
}

export const updateProposal = (id, newData) => async (dispatch) => {
    try {
        const { data } = await api.updateProposal(id, newData);
        dispatch(getProposalList());
        message('success', 'The proposal is updated successfully.', dispatch);
    } catch (error) {
        message('error', 'Could not update!', dispatch);
    }
}

export const deleteProposal = (id) => async (dispatch) => {
    try {
        await api.deleteProposal(id);
        dispatch(getProposalList());
        message('success', 'The proposal is deleted successfully', dispatch);
    } catch (error) {
        message('error', 'Could not delete!', dispatch);
    }
}

export const getApproved = (id) => async (dispatch) => {
//   console.log("Approve:", id);
    try {
        await api.getApproved(id);
        dispatch(getProposalList());
        message('success', 'Approved successfully!', dispatch);
    } catch (error) {
        message('error', 'Could not approve', dispatch);
    }
}

export const getDeclined = (id) => async (dispatch) => {
    // console.log("decline:", id);
    try {
        await api.getDeclined(id);
        dispatch(getProposalList());
        message('success', 'The proposal is declined.', dispatch);
    } catch (error) {
        message('error', 'Could not decline', dispatch);
    }
}

export const viewRequest = (id) => async (dispatch) => {
    // console.log("viewid:", id);
    try {
        const { data } = await api.viewRequest(id);
        window.open(data,'_blank');
        
    } catch (error) {
        message('error', 'The file is not exist!', dispatch);
    }
}

export const sendMail = (id) => async (dispatch) => {
    try {
        const {data} = await api.sendMail(id);
        message('success', 'Sended mail successfully', dispatch);
    } catch (error) {
        message('error', 'Could not send mail', dispatch);
    }
}
