import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';
import HomePageReducer from './reducer_home_page';
import CurrentUserReducer from './reducer_current_user';
import CategoriesReducer from './reducer_categories';

const rootReducer = combineReducers({
    users: UsersReducer,
    home: HomePageReducer,
    currentUser: CurrentUserReducer,
    categories: CategoriesReducer
});

export default rootReducer;