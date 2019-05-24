import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListArea from '../../containers/ListArea/ListArea';
// import ListInput from '../../containers/ListInput/ListInput';

class HomeScreen extends Component {
	render() {
		return (
			<Fragment>
				{/* <section className="input-section"> */}
				<Link to="/new-note">
					<button>Add New List</button>
				</Link>
				{/* </section> */}
				<ListArea />
			</Fragment>
		);
	}
}

export default HomeScreen;
