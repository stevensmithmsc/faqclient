import { REQUESTING_REPORT_DATA, UPDATE_SYSTEM_REP_DATA, UPDATE_CATS_REP_DATA, UPDATE_SYS_AUTH_REP_DATA, UPDATE_AUTH_REP_DATA  } from '../actions';

const initialState = {
    fetching: 0, systemData: [], catData: [], sysAuthData: [], authData: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUESTING_REPORT_DATA:
            let newFetching = state.fetching + 1;
            return { ...state, fetching: newFetching };

        case UPDATE_SYSTEM_REP_DATA:
            let sysFetching = state.fetching - 1;
            return { ...state, systemData: action.payload, fetching: sysFetching };

        case UPDATE_CATS_REP_DATA:
            let catFetching = state.fetching - 1;
            return { ...state, catData: action.payload, fetching: catFetching };

        case UPDATE_SYS_AUTH_REP_DATA:
            let authFetching = state.fetching - 1;
            return { ...state, sysAuthData: action.payload, fetching: authFetching };

        case UPDATE_AUTH_REP_DATA:
            let useFetching = state.fetching - 1;
            return { ...state, authData: action.payload, fetching: useFetching };

        default:
            return state;
    }
}