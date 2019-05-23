import React, { Component } from "react";
import ListItem from "../../components/ListItem/ListItem";


import "./ListCard.scss";

class ListCard extends Component {
  //for strikethrough, each list item will likely need an id that when the card is clicked,
  //that card's state will update to reflect that it has been completed.
  //backend - task complete, frontend - strikethrough
  render() {
    const { title, notes } = this.props;
    
  const displayNotes = notes.map( (note) => {
    return <ListItem key={note.id} {...note} />
  })
    return (
      <article className="ListCard">
        <h3>{title}</h3>
        <ul>
         {displayNotes}
        </ul>
      </article>
    );
  }
}

export default ListCard;
