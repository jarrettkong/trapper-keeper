import React, { Component } from 'react';
import ListCard from '../ListCard/ListCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ListArea.scss';

class ListArea extends Component {
	render() {
		const { lists } = this.props;
		const displayLists = lists.map(list => {
			return (
				<Link to={`/notes/${list.id}`} key={list.id} style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListCard {...list} />
				</Link>
			);
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

export default connect(mapStateToProps)(ListArea);
