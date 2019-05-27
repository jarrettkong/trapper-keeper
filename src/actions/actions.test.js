import { mockList, mockLists } from '../util/mockData';
import * as actions from './index';

describe('addList', () => {
	it('should return an action object with type ADD_LIST and payload of a list object', () => {
		const expected = {
			type: 'ADD_LIST',
			payload: { list: { id: Date.now(), ...mockList } }
		};
		const action = actions.addList({ id: Date.now(), ...mockList });
		expect(action).toEqual(expected);
	});
});

describe('deleteList', () => {
	it('should return an action object with type DELETE_LIST and payload of a list object', () => {
		const expected = {
			type: 'DELETE_LIST',
			payload: { id: 101 }
		};
		const action = actions.deleteList(101);
		expect(action).toEqual(expected);
	});
});

describe('updateList', () => {
	it('should return an action object with type UPDATE_LIST and a payload of a list object', () => {
		const expected = {
			type: 'UPDATE_LIST',
			payload: { list: { id: Date.now(), ...mockList } }
		};
		const action = actions.updateList({ id: Date.now(), ...mockList });
		expect(action).toEqual(expected);
	});
});

describe('addAllLists', () => {
	it('should return an action object with type ADD_ALL_LISTS and a payload of a lists array', () => {
		const expected = {
			type: 'ADD_ALL_LISTS',
			payload: { lists: mockLists }
		};
		const action = actions.addAllLists(mockLists);
		expect(action).toEqual(expected);
	});
});
