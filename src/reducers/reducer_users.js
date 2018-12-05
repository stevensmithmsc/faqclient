import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER, REQUEST_USER_DATA } from '../actions';

export default function (state = { people: [], loading: false }, action) {
    switch (action.type) {
        case GET_USERS:
            return { people: action.payload, loading: false };

        case ADD_USER:
            return { people: [...state.people, action.payload], loading: false };

        case UPDATE_USER:
            return { people: [...state.people.filter(u => u.id !== action.payload.id), action.payload], loading: false };

        case DELETE_USER:
            return { people: state.people.filter(u => u.id !== action.payload.id), loading: false };

        case REQUEST_USER_DATA:
            return { ...state, loading: true };

        default:
            return state;
    }
}