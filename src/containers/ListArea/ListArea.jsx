import React, { Component } from 'react';
import ListInput from '../ListInput/ListInput';
import ListCard from '../ListCard/ListCard';
import './ListArea.scss';
class ListArea extends Component {
	state = {
		lists: []
  };

	render() {
		return (
			<div className="ListArea">
				<section className="input-section">
					<ListInput />
				</section>
				<section className="output-section">
					<ListCard />
				</section>
			</div>
		);
	}
}

export default ListArea;
