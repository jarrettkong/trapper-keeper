import React, { Component } from "react";
import ListInput from "../ListInput/ListInput";
import ListCard from "../ListCard/ListCard";
import "./ListArea.scss";
class ListArea extends Component {
  render() {
    return (
      <div className="ListArea">
        <div className="input-section">
          <ListInput />
        </div>
        <div className="output-section">
          <ListCard />
        </div>
      </div>
    );
  }
}

export default ListArea;
