import { GET_CURRENT_USER } from '../actions';

const initialState = { name: "unknown", fetched: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...action.payload, fetched: true };

        default:
            return state;
    }
}