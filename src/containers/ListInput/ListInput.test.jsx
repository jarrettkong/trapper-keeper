import React from 'react';
import { ListInput } from './ListInput';
import { shallow } from 'enzyme';
import { getListData, addNewList, updateList } from '../../util/apiCalls';
import { mockList, mockLists, mockHistory, mockNote, mockPartialCompleteList } from '../../util/mockData';

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

	it('should match the snapshot if some items are complete', () => {
		wrapper = shallow(<ListInput lists={[mockPartialCompleteList]} />);
		expect(wrapper).toMatchSnapshot();
	});

	it.skip('should call modifyNote if a note is changed', () => {
		jest.spyOn(wrapper.instance(), 'modifyNote');
		wrapper
			.find('.existing-note-input')
			.first()
			.simulate('change');
		expect(wrapper.instance().modifyNote).toHaveBeenCalled();
	});

	it.skip('should call modifyNote if a toggle icon is clicked', () => {
		jest.spyOn(wrapper.instance(), 'modifyNote');
		wrapper.find('.toggle-icon').simulate('click');
		expect(wrapper.instance().modifyNote).toHaveBeenCalled();
	});

	it.skip('should call deleteNote if a delete icon is clicked', () => {
		jest.spyOn(wrapper.instance(), 'deleteNote');
		wrapper.find('.delete-icon').simulate('click');
		expect(wrapper.instance().deleteNote).toHaveBeenCalled();
	});

	it('should set isActive to true on focus', () => {
		wrapper.find('.input-list-item').simulate('focus');
		expect(wrapper.state('isActive')).toEqual(true);
	});

	it.skip('should set isActive to true on focus', () => {
		jest.spyOn(wrapper.instance(), 'saveNote');
		wrapper.find('.input-list-item').simulate('blur');
		expect(wrapper.instance().saveNote).toHaveBeenCalled();
	});

	it.skip('should call handleSave when save-btn is clicked', () => {
		jest.spyOn(wrapper.instance(), 'handleSave');
		wrapper.find('.save-btn').simulate('click');
		expect(wrapper.instance().handleSave).toHaveBeenCalled();
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
			expect(wrapper.state('isActive')).toEqual(false);
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
		it.skip('should remove the note with the corresponding id', () => {
			const mockNotes = [mockNote, { ...mockNote, id: 1 }, mockNote];
			wrapper.setState({ notes: mockNotes });
			wrapper.instance().deleteNote(1);
			expect(wrapper.state('notes')).toEqual(expect.not.arrayContaining([{ ...mockNote, id: 1 }]));
		});
	});

	describe('modifyNote', () => {
		beforeEach(() => {
			const mockNotes = [mockNote, { ...mockNote, id: 1 }, mockNote];
			wrapper.setState({ notes: mockNotes });
		});

		it.skip('should toggle the note with the matching id', () => {
			wrapper.instance().modifyNote('toggle', 1);
			expect(wrapper.state('notes')).toEqual(expect.arrayContaining([{ ...mockNote, complete: true, id: 1 }]));
		});

		it.skip('should update the note with the matching id', () => {
			const mockEvent = { target: { value: 'new value' } };
			wrapper
				.find('.existing-note')
				.first()
				.simulate('change', mockEvent);
			expect(wrapper.state('notes')).toEqual(expect.arrayContaining([{ ...mockNote, userTask: 'new value' }]));
		});
	});

	describe('returnHome', () => {
		it.skip('should not call returnHome only if the .modal is clicked', () => {
			jest.spyOn(wrapper.instance(), 'returnHome');
			// ! this
			const target = <div class="modal" />;
			const mockEvent = { target };
			wrapper.find('form').simulate('click');
			expect(wrapper.instance().returnHome).not.toHaveBeenCalled();
			wrapper.find('.modal').simulate('click', mockEvent);
			expect(wrapper.instance().returnHome).toHaveBeenCalled();
		});
	});
});
