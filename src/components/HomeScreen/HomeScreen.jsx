<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, { Fragment } from 'react';
>>>>>>> cd2e4c22a5b26f3f70b2c85eb187e40df4e77fe8
import { Link } from 'react-router-dom';
import ListArea from '../../containers/ListArea/ListArea';
import './HomeScreen.scss';
// import ListInput from '../../containers/ListInput/ListInput';

<<<<<<< HEAD
class HomeScreen extends Component {
	render() {
		return (
			<section className="HomeScreen">
				<h1>TrapperKeeper</h1>
				<div className="btn-area">
					<Link to="/new-note">
						<button>Add New List</button>
					</Link>
				</div>
				<ListArea />
			</section>
		);
	}
}
=======
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
>>>>>>> cd2e4c22a5b26f3f70b2c85eb187e40df4e77fe8

export default HomeScreen;
