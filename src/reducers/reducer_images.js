import { UPLOAD_IMAGE, UPLOAD_FAILED, RECIEVE_IMAGES } from '../actions';

const initialState = [
    {
        id: 1,
        caption: "React Logo",
        url: "/Images/logo.svg",
        height: 50,
        width: 50
    }, {
        id: 2,
        caption: "Pacman Timer",
        url: "/Images/pacman.gif",
        height: 200,
        width: 200
    }, {
        id: 3,
        caption: "Paris",
        url: "http://parisunlock/Content/Paris.png",
        height: 275,
        width: 203
    }, {
        id: 4,
        caption: "Pennine Care Logo",
        url: "http://paristraining/Images/trust colour logo.png",
        height: 335,
        width: 1593
    }];

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return [ ...state, action.payload ];

        case UPLOAD_FAILED:
            console.log('Failure', action.payload);
            return state;

        case RECIEVE_IMAGES:
            return action.payload;

        default:
            return state;
    }
}