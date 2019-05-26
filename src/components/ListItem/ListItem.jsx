import React from 'react';
import './ListItem.scss';

const ListItem = props => {
	const { userTask, complete } = props;
	if (complete) {
		return (
			<li className="ListItem completedTask">
				<i className="material-icons checked">check</i>
				<p>{userTask}</p>
			</li>
		);
	} else {
		return (
			<li className="ListItem activeTask">
				<i className="material-icons">crop_square</i>
				<p>{userTask}</p>
			</li>
		);
	}
};

export default ListItem;
