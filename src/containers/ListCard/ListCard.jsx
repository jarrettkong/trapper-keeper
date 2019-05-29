import React, { Component } from "react";
import ListItem from "../../components/ListItem/ListItem";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as apiCalls from "../../util/apiCalls";

import "./ListCard.scss";

export class ListCard extends Component {
  state = {
    error: null
  };

  deleteList = async () => {
    try {
      await apiCalls.deleteList(this.props.id);
      this.props.deleteList(this.props.id);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { title, notes } = this.props;

    const incompleteNotes = notes
      .filter(n => !n.complete)
      .map(note => <ListItem key={note.id} {...note} complete={false} />);
    const completeNotes = notes
      .filter(n => n.complete)
      .map(note => <ListItem key={note.id} {...note} complete={true} />);

    return (
      <article className="ListCard">
        <h3>{title}</h3>
        <ul>{incompleteNotes}</ul>
        <ul>{completeNotes}</ul>
        <div className="btn-container">
          <i class="material-icons btn" onClick={this.deleteList}>
            delete_forever
          </i>
          <Link to={`/notes/${this.props.id}`} key={this.props.id}>
            <i class="material-icons btn ">create</i>
          </Link>
        </div>
      </article>
    );
  }
}

ListCard.propTypes = {
  deleteList: PropTypes.func,
  id: PropTypes.number,
  notes: PropTypes.array,
  title: PropTypes.string
};

export const mapDispatchToProps = dispatch => ({
  deleteList: id => dispatch(actions.deleteList(id))
});

export default connect(
  null,
  mapDispatchToProps
)(ListCard);
