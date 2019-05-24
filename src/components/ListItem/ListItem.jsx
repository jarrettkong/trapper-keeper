import React from 'react';
import './ListItem.scss';

const ListItem = props => {
	const { userTask, complete } = props;
	return (
		<div className="ListItem">
			{complete ? (
				<React.Fragment>
					<i className="material-icons checked">check</i>
					<li className="completedTask">{userTask}</li>
				</React.Fragment>
			) : (
				<React.Fragment>
					<i className="material-icons">crop_square</i>
					<li className="activeTask">{userTask}</li>
				</React.Fragment>
			)}
		</div>
	);
};

export default ListItem;
