import React from 'react';
import { ListArea, mapStateToProps, mapDispatchToProps } from './ListArea';
import { shallow } from 'enzyme';
import { mockLists, mockState } from '../../util/mockData';
import { getAllLists } from '../../util/apiCalls';
import { addAllLists } from '../../actions';

jest.mock('../../util/apiCalls');

describe('ListArea', () => {
	let wrapper, mockAddAllLists;
	beforeEach(() => {
		mockAddAllLists = jest.fn();
		wrapper = shallow(<ListArea lists={mockLists} addAllLists={mockAddAllLists} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('componentDidMount', () => {
		it('should call getExistingLists on call', () => {
			jest.spyOn(wrapper.instance(), 'getExistingLists');
			wrapper.instance().componentDidMount();
			expect(wrapper.instance().getExistingLists).toHaveBeenCalled();
		});
	});

	describe('getExistingLists', () => {
		it('should call getAllLists from apiCalls', async () => {
			await wrapper.instance().getExistingLists();
			expect(getAllLists).toHaveBeenCalled();
		});

		it('should call addAllLists on call', async () => {
			await wrapper.instance().getExistingLists();
			expect(mockAddAllLists).toHaveBeenCalled();
		});
	});
});

describe('mapStateToProps', () => {
	it('should return an object with a key of lists and a value of an array of lists', () => {
		const mappedProps = mapStateToProps(mockState);
		expect(mappedProps).toEqual({ lists: mockLists });
	});
});

describe('mapDispatchToProps', () => {
	it('should call dispatch with a addAllLists action when getExistingLists is called', async () => {
		const mockDispatch = jest.fn();
		const actionToDispatch = addAllLists(mockLists);
		const mappedProps = mapDispatchToProps(mockDispatch);

		mappedProps.addAllLists(mockLists);

		expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
	});
});
