import React from 'react';
import ListInput from './ListInput';
import { shallow } from 'enzyme';

describe('ListInput', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ListInput />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
