import { GET_HOME_PAGE, HOME_PAGE_REQUEST } from '../actions';

const initalState = {
    greeting: "Welcome to ...",
    description: "This application is for ...",
    directions: "To use this app....",
    warning: "Note: Searching may bring back too many answers.",
    loading: false,
    fetched: null
};

export default function (state = initalState, action) {
    switch (action.type) {
        case HOME_PAGE_REQUEST:
            return { ...state, loading: true };

        case GET_HOME_PAGE:
            return {
                greeting: action.payload.greeting,
                description: action.payload.description,
                directions: action.payload.directions,
                warning: action.payload.warning,
                loading: false,
                fetched: new Date()
            };


        default:
            return state;
    }
}