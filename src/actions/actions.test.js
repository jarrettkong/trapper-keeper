import { mockList, mockNote } from '../util/mockData';
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

describe('addNote', () => {
	it('should return an action object with type ADD_NOTE and payload of an note object', () => {
		const expected = {
			type: 'ADD_NOTE',
			payload: { note: mockNote }
		};
		const action = actions.addNote(mockNote);
		expect(action).toEqual(expected);
	});
});

describe('toggleNote', () => {
	it('should return an action object with type TOGGLE_NOTE and payload of an id', () => {
		const expected = {
			type: 'TOGGLE_NOTE',
			payload: { id: 101 }
		};
		const action = actions.toggleNote(101);
		expect(action).toEqual(expected);
	});
});

describe('deleteNote', () => {
	it('should return an action object with type DELETE_NOTE and payload of an id', () => {
		const expected = {
			type: 'DELETE_NOTE',
			payload: { id: 101 }
		};
		const action = actions.deleteNote(101);
		expect(action).toEqual(expected);
	});
});
