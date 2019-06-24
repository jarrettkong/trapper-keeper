import React from 'react';
import './App.scss';
import HomeScreen from '../HomeScreen/HomeScreen';
import ListInput from '../../containers/ListInput/ListInput';

import { Route } from 'react-router-dom';

const App = () => {
	return (
		<main className="App">
			<Route path="/" component={HomeScreen} />
			<Route path="/new-note" render={({ history }) => <ListInput history={history} />} />
			<Route
				path="/notes/:id"
				render={({ match, history }) => <ListInput history={history} id={match.params.id} />}
			/>
		</main>
	);
};

export default App;
