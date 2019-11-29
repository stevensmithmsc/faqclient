import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';
import HomePageReducer from './reducer_home_page';
import CurrentUserReducer from './reducer_current_user';
import CategoriesReducer from './reducer_categories';
import AnswersReducer from './reducer_answers';
import FeedbackReducer from './reducer_feedback';
import QuestionsReducer from './reducer_questions';
import ImageReducer from './reducer_images';
import ReportsReducer from './reducer_reports';

const rootReducer = combineReducers({
    users: UsersReducer,
    home: HomePageReducer,
    currentUser: CurrentUserReducer,
    categories: CategoriesReducer,
    questions: QuestionsReducer,
    answers: AnswersReducer,
    feedback: FeedbackReducer,
    images: ImageReducer,
    reports: ReportsReducer
});

export default rootReducer;