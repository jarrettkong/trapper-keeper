import React, { Component } from "react";
import ListCard from "../ListCard/ListCard";
import { getAllLists } from "../../util/apiCalls";
import { addLists } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ListArea.scss";

class ListArea extends Component {
  componentDidMount() {
    this.getExistingLists();
  }

  getExistingLists = async () => {
    const lists = await getAllLists();
    this.props.addLists(lists);
  };

  render() {
    const { lists } = this.props;
    const displayLists = lists.map(list => {
      return <ListCard {...list} key={list.id} />;
    });
    return (
      <output className="ListArea">
        <section className="output-section">{displayLists}</section>
      </output>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
  addLists: lists => dispatch(addLists(lists))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListArea);
