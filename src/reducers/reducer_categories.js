import { REQUEST_CATEGORIES, GET_CATEGORIES, TOGGLE_CATEGORY, SET_CURRENT_CATEGORY } from '../actions';

const initialState = {
    categories: [
        {
            id: 14,
            categoryName: "CIS",
            subs: [{
                id: 3,
                categoryName: "FAQ App",
                subs: [
                    {
                        id: 5,
                        categoryName: "New Question"
                    },
                    {
                        id: 6,
                        categoryName: "Search"
                    }
                ],
                open: false
            },
            {
                id: 4,
                categoryName: "General"
            }],
            open: false
        }

    ],
    current: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return { ...state, loading: true };

        case GET_CATEGORIES:
            return { ...state, categories: action.payload, loading: false };

        case TOGGLE_CATEGORY:
            let newcats = [...state.categories];
            for (var cat in newcats) {
                if (newcats[cat].id === action.payload) {
                    newcats[cat].open = !newcats[cat].open;
                }
                if (newcats[cat].subs && newcats[cat].open) {
                    for (var s in newcats[cat].subs) {
                        if (newcats[cat].subs[s].id === action.payload) {
                            newcats[cat].subs[s].open = !newcats[cat].subs[s].open;
                        }
                    }
                }
            }
            return { ...state, categories: newcats };

        case SET_CURRENT_CATEGORY:
            let ncats = [...state.categories];
            if (action.payload.length > 0) {
                for (var c in ncats) {
                    if (action.payload[0].localeCompare(ncats[c].categoryName) === 0) {
                        ncats[c].open = true;
                        if (action.payload.length > 1 && ncats[c].subs) {
                            for (var sub in ncats[c].subs) {
                                if (ncats[c].subs[sub].categoryName.localeCompare(action.payload[1]) === 0) {
                                    ncats[c].subs[sub].open = true;
                                    if (action.payload.length > 2 && ncats[c].subs[sub].subs) {
                                        for (var sc in ncats[c].subs[sub].subs) {
                                            if (ncats[c].subs[sub].subs[sc].categoryName.localeCompare(action.payload[2]) === 0) {
                                                ncats[c].subs[sub].subs[sc].open = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
                
            //console.log(ncats);
            return { ...state, current: action.payload, categories: ncats };

        default:
            return state;
    }
}