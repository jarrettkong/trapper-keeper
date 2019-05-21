import React, { Component } from "react";
import ListItem from "../../components/ListItem/ListItem";
import "./ListCard.scss";

class ListCard extends Component {
  //for strikethrough, each list item will likely need an id that when the card is clicked,
  //that card's state will update to reflect that it has been completed.
  //backend - task complete, frontend - strikethrough
  render() {
    return (
      <article className="ListCard">
        <ul>
          <ListItem userTask={"Go fishing"} />
          <ListItem userTask={"Fold the laundry"} />
          <ListItem userTask={"Swing by the Grocery Store"} />
          <ListItem userTask={"Read the newspaper"} />
        </ul>
      </article>
    );
  }
}

export default ListCard;
