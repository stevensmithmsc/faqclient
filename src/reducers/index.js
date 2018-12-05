import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';
import HomePageReducer from './reducer_home_page';
import CurrentUserReducer from './reducer_current_user';

const rootReducer = combineReducers({
    users: UsersReducer,
    home: HomePageReducer,
    currentUser: CurrentUserReducer
});

export default rootReducer;