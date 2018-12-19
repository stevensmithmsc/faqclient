import { REQUESTING_QUESTIONS, SET_SEARCHSTRING, RECIEVED_PAGE } from '../actions';

const initialState = {
    searchString: "",
    pages: {},
    pageSize: 20,
    totalQs: 0,
    totalPages: 1,
    fetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUESTING_QUESTIONS:
            return { ...state, fetching: true };

        case SET_SEARCHSTRING:
            let searchTerms = [];
            if (action.payload.cats) {
                searchTerms.push("cats=" + action.payload.cats.join(","));
            }
            if (action.payload.keyword) {
                searchTerms.push("keyWord=" + action.payload.keyword);
            }
            const newSearch = searchTerms.join("&");
            if (state.searchString === newSearch) {
                return state;
            }
            console.log(newSearch);
            return { ...state, searchString: newSearch, pages: {}, totalQs: 0, totalPages: 1 };

        case RECIEVED_PAGE:
            let pages = state.pages;
            pages[action.payload.pageNum] = action.payload.questions;
            const totalQs = action.payload.total;
            const pageSize = action.payload.pageSize;
            const totalPages = Math.floor((totalQs - 1) / pageSize) + 1;
            return { ...state, pages, totalQs, pageSize, totalPages, fetching: false };

        default:
            return state;
    }
}