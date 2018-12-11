import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';
import HomePageReducer from './reducer_home_page';
import CurrentUserReducer from './reducer_current_user';
import CategoriesReducer from './reducer_categories';
import AnswersReducer from './reducer_answers';
import FeedbackReducer from './reducer_feedback';

const rootReducer = combineReducers({
    users: UsersReducer,
    home: HomePageReducer,
    currentUser: CurrentUserReducer,
    categories: CategoriesReducer,
    answers: AnswersReducer,
    feedback: FeedbackReducer
});

export default rootReducer;