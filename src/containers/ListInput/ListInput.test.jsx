import React from 'react';
import { ListInput } from './ListInput';
import { shallow } from 'enzyme';
import { getListData, addNewList, updateList } from '../../util/apiCalls';
import { mockList, mockLists, mockHistory, mockNote } from '../../util/mockData';

jest.mock('../../util/apiCalls');

describe('ListInput', () => {
	let wrapper, mockUpdateList, mockAddList;
	beforeEach(() => {
		mockUpdateList = jest.fn();
		mockAddList = jest.fn();
		wrapper = shallow(
			<ListInput
				id={mockList.id}
				lists={mockLists}
				history={mockHistory}
				updateList={mockUpdateList}
				addList={mockAddList}
			/>
		);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('componentDidMount', () => {
		it('should call getExistingInfo on call', () => {
			jest.spyOn(wrapper.instance(), 'getExistingInfo');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().getExistingInfo).toHaveBeenCalled();
		});
	});

	describe('getExistingInfo', () => {
		afterEach(() => {
			getListData.mockClear();
		});

		it.skip('should check if there is an id, and if not do nothing', async () => {
			wrapper = shallow(<ListInput id={null} />);
			const intialState = {
				isActive: false,
				main: '',
				title: '',
				notes: [],
				error: null
			};
			await wrapper.instance().getExistingInfo();
			expect(getListData).toHaveBeenCalledTimes(0);
			expect(wrapper.state()).toEqual(intialState);
		});

		it.skip('should call getListData if there is an id and set state to the mock data', async () => {
			getListData.mockImplementation(() => mockList);
			const expected = {
				isActive: false,
				main: '',
				title: mockList.title,
				notes: mockList.notes,
				error: ''
			};

			await wrapper.instance().getExistingInfo();
			expect(getListData).toHaveBeenCalledWith(mockList.id);
			expect(wrapper.state()).toEqual(expected);
		});

		it.skip('should save the error in state if it fails', async () => {
			wrapper = shallow(<ListInput id={999} />);
			getListData.mockImplementation(() => Promise.reject(new Error()));
			await wrapper.instance().getExistingInfo();
			expect(wrapper.state('error')).not.toEqual('');
		});
	});

	describe('handleChange', () => {
		it('should setState when called for the corresponding input', () => {
			let event = { target: { name: 'main', value: 'test' } };
			wrapper.find('input[name="main"]').simulate('change', event);
			expect(wrapper.state('main')).toEqual('test');

			event = { target: { name: 'title', value: 'My List' } };
			wrapper.find('input[name="title"]').simulate('change', event);
			expect(wrapper.state('title')).toEqual('My List');
		});
	});

	describe('handleKeypress', () => {
		it('should do nothing if e.key is not enter', () => {
			const event = { key: 'Not Enter' };
			wrapper.find('input[name="main"]').simulate('keypress', event);
			expect(wrapper.state('notes')).toEqual([]);
		});
		it('should do nothing if main is empty', () => {
			const event = { key: 'Enter' };
			wrapper.find('input[name="main"]').simulate('keypress', event);
			expect(wrapper.state('notes')).toEqual([]);
		});

		it('should call saveNote if both conditions are met', () => {
			jest.spyOn(wrapper.instance(), 'saveNote');
			const event = { key: 'Enter' };
			wrapper.setState({ main: 'Test content' });
			wrapper.find('input[name="main"]').simulate('keypress', event);
			expect(wrapper.instance().saveNote).toHaveBeenCalled();
		});
	});

	describe('saveNote', () => {
		it('should add a new note to state', () => {
			wrapper.setState({ main: 'Test content' });
			wrapper.instance().saveNote();
			expect(wrapper.state('notes')).toHaveLength(1);
		});
	});

	describe('handleSave', () => {
		it('should call updateList if it finds a list', async () => {
			jest.spyOn(wrapper.instance(), 'updateList');
			wrapper.setState({ title: mockList.title, notes: mockList.notes });
			await wrapper.instance().handleSave();
			expect(wrapper.instance().updateList).toHaveBeenCalledWith(mockList);
		});

		it('should call createNewList if it does not find a list', async () => {
			wrapper = shallow(<ListInput id={null} lists={mockLists} history={mockHistory} />);
			const note = { title: 'My Title', notes: [mockNote] };
			wrapper.setState({ ...note });
			jest.spyOn(wrapper.instance(), 'createNewList');
			await wrapper.instance().handleSave();
			expect(wrapper.instance().createNewList).toHaveBeenCalledWith(note);
		});
	});

	describe('createNewList', () => {
		let listData;
		beforeEach(() => {
			listData = { ...mockList };
			delete listData.id;
		});

		it('should call apiCalls.addNewList and addList if there are no errors', async () => {
			await wrapper.instance().createNewList(listData);
			expect(addNewList).toHaveBeenCalledWith(listData);
			expect(mockAddList).toHaveBeenCalled();
		});

		it('should call apiCalls.addNewList and addList if there are no errors', async () => {
			const list = await wrapper.instance().createNewList(listData);
			expect(mockAddList).toHaveBeenCalledWith(list);
		});

		it('should setState back to initial', async () => {
			const expected = {
				isActive: false,
				main: '',
				title: '',
				notes: [],
				error: ''
			};
			await wrapper.instance().createNewList(listData);
			expect(wrapper.state()).toEqual(expected);
		});

		it.skip('should set the error state if there is an error', async () => {
			getListData.mockImplementation(() => Promise.reject(new Error()));
			await wrapper.instance().createNewList(listData);
			expect(wrapper.state('error')).not.toEqual('');
		});
	});

	describe('updateList', () => {
		it('should call apiCalls.updateList on call', async () => {
			await wrapper.instance().updateList(mockList);
			expect(updateList).toHaveBeenCalledWith(mockList);
		});

		it('should call props.updateList on call', async () => {
			await wrapper.instance().updateList(mockList);
			expect(mockUpdateList).toHaveBeenCalledWith(mockList);
		});

		// ! why does this one work
		it('should set the error state if there is an error', async () => {
			updateList.mockImplementation(() => Promise.reject(new Error()));
			await wrapper.instance().updateList(mockList);
			expect(wrapper.state('error')).not.toEqual('');
		});
	});

	describe('deleteNote', () => {
		it('should remove the note with the corresponding id', () => {
			const mockNotes = [mockNote, { ...mockNote, id: 1 }, mockNote];
			wrapper.setState({ notes: mockNotes });
			wrapper.instance().deleteNote(1);
			expect(wrapper.state('notes')).toEqual(expect.not.arrayContaining([{ ...mockNote, id: 1 }]));
		});
	});
});
