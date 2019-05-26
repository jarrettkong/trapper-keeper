import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListArea from '../../containers/ListArea/ListArea';
import './HomeScreen.scss';
// import ListInput from '../../containers/ListInput/ListInput';

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

export default HomeScreen;
