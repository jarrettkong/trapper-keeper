import { combineReducers } from 'redux';
import { listsReducer } from './listsReducer';
import { itemsReducer } from './itemsReducer';

export const rootReducer = combineReducers({
	ideas: listsReducer,
	items: itemsReducer
});
