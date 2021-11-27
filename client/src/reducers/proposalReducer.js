
import { GET_PROPOSALS_SUCCESS, VIEW_DATA } from '../constants/applyConstant';

const initialState = {
    proposals: [],
    url: ""
}

export const proposalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROPOSALS_SUCCESS:
            return { ...state, proposals: action.payload }
        case VIEW_DATA:
            return { ...state, url:action.payload}
        // case dfsdf: 
        //     return {...state, proposals: [...state.filter(state=> state._id !== action.payload._id), action.payload]}

        default: return state;
    }
}