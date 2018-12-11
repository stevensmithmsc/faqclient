import { GET_FEEDBACK } from '../actions';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FEEDBACK:
            const now = new Date();
            return [...state.filter(f => f.id !== action.payload.id), { ...action.payload, fetched: now }];

        default:
            return state;
    }
}