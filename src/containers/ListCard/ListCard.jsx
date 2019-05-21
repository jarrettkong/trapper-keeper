import React, { Component } from "react";
import "./ListCard.scss";

class ListCard extends Component {
  render() {
    return (
      <article className="ListCard">
        <ul>
          <div>
            <i class="material-icons">crop_square</i>
            <li>Go Fishing</li>
          </div>
          <div>
            <i class="material-icons">crop_square</i>
            <li>Return the book to the library</li>
          </div>
          <div>
            <i class="material-icons">crop_square</i>
            <li>Fold my clothes</li>
          </div>
        </ul>
      </article>
    );
  }
}

export default ListCard;
