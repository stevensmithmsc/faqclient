import { GET_CURRENT_USER, CREATE_QUESTION } from '../actions';

const initialState = { name: "unknown", fetched: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...action.payload, fetched: true };

        case CREATE_QUESTION:
            return { ...state, lastCreation: action.payload.id };

        default:
            return state;
    }
}