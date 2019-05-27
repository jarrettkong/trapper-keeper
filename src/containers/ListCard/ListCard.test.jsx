import React from 'react';
import { ListCard, mapDispatchToProps } from './ListCard';
import { mockList, mockPartialCompleteList } from '../../util/mockData';
import * as actions from '../../actions';
import { shallow } from 'enzyme';
import { deleteList } from '../../util/apiCalls';

jest.mock('../../util/apiCalls');

describe('ListCard', () => {
	let wrapper, mockDeleteList;
	beforeEach(() => {
		mockDeleteList = jest.fn();
		wrapper = shallow(<ListCard {...mockList} deleteList={mockDeleteList} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should match the snapshot if some notes are complete', () => {
		wrapper = shallow(<ListCard {...mockPartialCompleteList} deleteList={mockDeleteList} />);
		expect(wrapper).toMatchSnapshot();
	});

	describe('deleteList', () => {
		it('should call apiCalls.deleteList when called', async () => {
			await wrapper.instance().deleteList();
			expect(deleteList).toHaveBeenCalled();
		});

		it('should call props.deleteList when called', async () => {
			await wrapper.instance().deleteList();
			expect(mockDeleteList).toHaveBeenCalled();
		});

		it('should save the error in state', async () => {
			deleteList.mockImplementation(() => Promise.reject('Fail'));
			await wrapper.instance().deleteList();
			expect(wrapper.state('error')).toEqual('Fail');
		});
	});

	describe('mapDispatchToProps', () => {
		it('should call dispatch with a deleteList action when deleteList is called', async () => {});
		const mockDispatch = jest.fn();
		const actionToDispatch = actions.deleteList(mockPartialCompleteList.id);
		const mappedProps = mapDispatchToProps(mockDispatch);

		mappedProps.deleteList(mockPartialCompleteList.id);
		expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
	});
});
