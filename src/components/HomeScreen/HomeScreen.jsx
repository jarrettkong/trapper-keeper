import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListArea from '../../containers/ListArea/ListArea';
// import ListInput from '../../containers/ListInput/ListInput';

const HomeScreen = () => {
	return (
		<Fragment>
			<Link to="/new-note">
				<button>Add New List</button>
			</Link>
			<ListArea />
		</Fragment>
	);
};

export default HomeScreen;
