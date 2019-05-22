import { combineReducers } from 'redux';
import { listsReducer } from './listsReducer';

export const rootReducer = combineReducers({
	lists: listsReducer
});
