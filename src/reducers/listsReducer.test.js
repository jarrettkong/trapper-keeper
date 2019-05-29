import { listsReducer } from './listsReducer';
import * as actions from '../actions';
import * as mockData from '../util/mockData';

describe('listsReducer', () => {
	const initialState = [];
	const mockAction = {
		TYPE: 'INVALID_ACTION',
		payload: { list: null }
	};

	it('should return the default state with an invalid action', () => {
		const result = listsReducer(undefined, mockAction);
		expect(result).toEqual(initialState);
	});

	it('should return the state with all lists added', () => {
		const result = listsReducer(undefined, actions.addAllLists(mockData.mockLists));
		expect(result).toEqual(mockData.mockLists);
	});

	it('should return the state with new list', () => {
		const result = listsReducer(undefined, actions.addList(mockData.mockList));
		expect(result).toEqual([mockData.mockList]);
  });
});
