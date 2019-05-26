import React from 'react';
import ListItem from './ListItem';
import * as mockData from '../../util/mockData';
import { shallow } from 'enzyme';

describe('ListItem', () => {
	it('should match the snapshot', () => {
		const wrapper = shallow(<ListItem {...mockData.mockNote} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should match the snapshot if not complete', () => {
		const wrapper = shallow(<ListItem {...mockData.mockNote} complete={true} />);
		expect(wrapper).toMatchSnapshot();
	});
});
