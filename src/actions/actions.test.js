import { mockList, mockItem } from '../util/mockData';
import * as actions from './index';

describe('addList', () => {
	it('should return an action object with type ADD_LIST and payload of a list object', () => {
		const expected = {
			type: 'ADD_LIST',
			payload: { list: mockList }
		};
		const action = actions.addList(mockList);
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

describe('addItem', () => {
	it('should return an action object with type ADD_ITEM and payload of an item object', () => {
		const expected = {
			type: 'ADD_ITEM',
			payload: { item: mockItem }
		};
		const action = actions.addItem(mockItem);
		expect(action).toEqual(expected);
	});
});

describe('toggleItem', () => {
	it('should return an action object with type TOGGLE_ITEM and payload of an id', () => {
		const expected = {
			type: 'TOGGLE_ITEM',
			payload: { id: 101 }
		};
		const action = actions.toggleItem(101);
		expect(action).toEqual(expected);
	});
});

describe('deleteItem', () => {
	it('should return an action object with type DELETE_ITEM and payload of an id', () => {
		const expected = {
			type: 'DELETE_ITEM',
			payload: { id: 101 }
		};
		const action = actions.deleteItem(101);
		expect(action).toEqual(expected);
	});
});
