import React, { Component, Fragment } from 'react';
import ListArea from '../../containers/ListArea/ListArea';
import ListInput from '../../containers/ListInput/ListInput';

class HomeScreen extends Component {
	render() {
		return (
			<section>
				<section className="input-section">
					<ListInput />
				</section>
				<ListArea />
			</section>
		);
	}
}

export default HomeScreen;
