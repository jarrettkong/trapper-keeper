import React, { Component } from 'react';
import ListItem from '../../components/ListItem/ListItem';
import { Link } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as apiCalls from '../../util/apiCalls';

import './ListCard.scss';

class ListCard extends Component {
	deleteList = async () => {
		try {
			await apiCalls.deleteList(this.props.id);
			this.props.deleteList(this.props.id);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { title, notes } = this.props;

		const displayNotes = notes.map(note => {
			return <ListItem key={note.id} {...note} />;
		});
		return (
			<article className="ListCard">
				<h3>{title}</h3>
				<ul>{displayNotes}</ul>
				<button className="btn" onClick={this.deleteList}>
					Delete
				</button>
				<Link to={`/notes/${this.props.id}`} key={this.props.id} style={{ textDecoration: 'none', color: 'inherit' }}>
					<button className="btn">Edit</button>
				</Link>
			</article>
		);
	}
}

export const mapDispatchToProps = dispatch => ({
	deleteList: id => dispatch(actions.deleteList(id))
});

export default connect(null, mapDispatchToProps)(ListCard);
