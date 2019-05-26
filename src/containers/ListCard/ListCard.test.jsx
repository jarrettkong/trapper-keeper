import React from 'react';
import { ListCard } from './ListCard';
import { mockList, mockPartialCompleteList } from '../../util/mockData';
import { shallow } from 'enzyme';

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

	describe('deleteList', () => {});
});
