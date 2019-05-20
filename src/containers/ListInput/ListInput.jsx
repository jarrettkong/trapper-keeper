import React, { Component } from "react";
import "./ListInput.scss";

class ListInput extends Component {
  render() {
    return (
      <form action="" className="ListInput">
        <input type="text" name="title" placeholder="Title" />
        <div className="list-items">
          <input type="text" name="listItem" placeholder="List item" />
          <button>x</button>
        </div>
      </form>
    );
  }
}

export default ListInput;
