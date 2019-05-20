import React, { Component } from "react";
import ListInput from "../ListInput/ListInput";
import ListCard from "../ListCard/ListCard";

class ListArea extends Component {
  render() {
    return (
      <div>
        <h3>ListArea</h3>
        <ListInput />
        <ListCard />
      </div>
    );
  }
}

export default ListArea;
