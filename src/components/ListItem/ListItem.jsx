import React, { Fragment } from 'react';
import './ListItem.scss';

const ListItem = props => {
	const { userTask, complete } = props;
	return (
		<div className="ListItem">
			{complete ? (
				<Fragment>
					<li className="completedTask">
						<i className="material-icons checked">check</i>
						<p>{userTask}</p>
					</li>
				</Fragment>
			) : (
				<Fragment>
					<li className="activeTask">
						<i className="material-icons">crop_square</i>
						<p>{userTask}</p>
					</li>
				</Fragment>
			)}
		</div>
	);
};

export default ListItem;
