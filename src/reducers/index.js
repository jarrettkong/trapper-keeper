import { combineReducers } from 'redux';
import { listsReducer } from './listsReducer';
import { notesReducer } from './notesReducer';

export const rootReducer = combineReducers({
	lists: listsReducer,
	notes: notesReducer
});
