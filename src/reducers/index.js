import {combineReducers} from 'redux';
import history from './saveHistoryReducer';

export default combineReducers({
    history: history
});