import { GET_ANSWER, UPDATE_ANSWER, CREATE_QUESTION, FEEDBACK_USEFUL, FEEDBACK_COMMENT } from '../actions';

const initialState = [
    {
        id: "1",
        title: "What Happens if I Ask a Stupid Question?",
        categories: ["CIS", "General"],
        keyWords: ["Stupid", "Ask"],
        answer: "If you ask a stupid question you get a stupid answer."
    },
    {
        id: "2",
        title: "How do I create a new Question?",
        categories: ["CIS", "FAQ App", "New Question"],
        keyWords: ["Question", "Ask", "Stupid"],
        answer: "Press the new button, enter the details and press save."
    },
    {
        id: "3",
        title: "How do I search for Questions?",
        categories: ["CIS", "FAQ App", "Search"],
        keyWords: ["Search", "Stupid"],
        answer: "Press the search button."
    }
];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ANSWER:
            const now = new Date();
            return [...state.filter(q => q.id !== action.payload.id), { ...action.payload, fetched: now }];

        case FEEDBACK_USEFUL:
            let question = state.filter(q => q.id === action.payload.id)[0];
            question.score = question.score - question.helpful + action.payload.isHelpful;
            question.helpful = action.payload.isHelpful;
            return [...state.filter(q => q.id !== action.payload.id), question ];

        case FEEDBACK_COMMENT:
            let quest = state.filter(q => q.id === action.payload.id)[0];
            quest.score = quest.score - quest.helpful + action.payload.isHelpful;
            quest.helpful = action.payload.isHelpful;
            quest.comment = action.payload.comment;
            return [...state.filter(q => q.id !== action.payload.id), quest];

        default:
            return state;
    }
}