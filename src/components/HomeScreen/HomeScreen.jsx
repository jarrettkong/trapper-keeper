import React from 'react';
import { Link } from 'react-router-dom';
import ListArea from '../../containers/ListArea/ListArea';
import './HomeScreen.scss';

const HomeScreen = () => {
	return (
		<section className="HomeScreen">
			<header>
				<h1>TrapperKeeper</h1>
				<Link to="/new-note">
					<button>Add New List</button>
				</Link>
			</header>
			<ListArea />
		</section>
	);
};

export default HomeScreen;
