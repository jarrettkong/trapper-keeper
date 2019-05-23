import React, { Component } from 'react';
import ListInput from '../ListInput/ListInput';
import ListCard from '../ListCard/ListCard';
import { connect } from 'react-redux';
import './ListArea.scss';
class ListArea extends Component {
	render() {
    const { lists } = this.props;
    const displayLists = lists.map( (list) => {
      return <ListCard key={list.id} {...list}/>
    })
		return (
			<div className="ListArea">
				<section className="input-section">
					<ListInput />
				</section>
				<section className="output-section">
					{displayLists}
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
  lists: state.lists
})

export default connect(mapStateToProps)(ListArea);
