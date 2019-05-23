import React, { Component, Fragment } from 'react';
import ListArea from '../../containers/ListArea/ListArea';
import ListInput from '../../containers/ListInput/ListInput';

class HomeScreen extends Component {
	render() {
		return (
			<Fragment>
				<section className="input-section">
					<ListInput />
				</section>
				<ListArea />
			</Fragment>
		);
	}
}

export default HomeScreen;
