import React, { Component } from 'react';
import ListCard from '../ListCard/ListCard';
import * as apiCalls from '../../util/apiCalls';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import './ListArea.scss';

class ListArea extends Component {
	componentDidMount() {
		this.getExistingLists();
	}

	getExistingLists = async () => {
		const lists = await apiCalls.getAllLists();
		this.props.addAllLists(lists);
	};

	render() {
		const { lists } = this.props;
		const displayLists = lists.map(list => {
			return <ListCard {...list} key={list.id} />;
		});
		return (
			<output className="ListArea">
				<section className="output-section">{displayLists}</section>
			</output>
		);
	}
}

const mapStateToProps = state => ({
	lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
	addAllLists: lists => dispatch(actions.addAllLists(lists))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
