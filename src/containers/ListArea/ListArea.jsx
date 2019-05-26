import React, { Component } from 'react';
import ListCard from '../ListCard/ListCard';
<<<<<<< HEAD
import { getAllLists } from '../../util/apiCalls';
import { addLists } from '../../actions';
=======
import * as apiCalls from '../../util/apiCalls';
import * as actions from '../../actions';
>>>>>>> cd2e4c22a5b26f3f70b2c85eb187e40df4e77fe8
import { connect } from 'react-redux';
import './ListArea.scss';

class ListArea extends Component {
	componentDidMount() {
		this.getExistingLists();
	}

	getExistingLists = async () => {
<<<<<<< HEAD
		const lists = await getAllLists();
		this.props.addLists(lists);
=======
		const lists = await apiCalls.getAllLists();
		this.props.addAllLists(lists);
>>>>>>> cd2e4c22a5b26f3f70b2c85eb187e40df4e77fe8
	};

	render() {
		const { lists } = this.props;
		const displayLists = lists.map(list => {
			return <ListCard {...list} key={list.id} />;
		});
<<<<<<< HEAD
		return <output className="ListArea">{displayLists}</output>;
=======
		return (
			<output className="ListArea">
				<section className="output-section">{displayLists}</section>
			</output>
		);
>>>>>>> cd2e4c22a5b26f3f70b2c85eb187e40df4e77fe8
	}
}

const mapStateToProps = state => ({
	lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
<<<<<<< HEAD
	addLists: lists => dispatch(addLists(lists))
=======
	addAllLists: lists => dispatch(actions.addAllLists(lists))
>>>>>>> cd2e4c22a5b26f3f70b2c85eb187e40df4e77fe8
});

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
