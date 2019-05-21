import React, { Component } from "react";
import "./ListInput.scss";

class ListInput extends Component {
  state = {
    isActive: "inactive",
    activeInput: false
  };

  handleFocus = () => {
    this.setState({ isActive: "active" });
  };

  handleBlur = () => {
    this.state.activeInput
      ? this.setState({ isActive: "inactive" })
      : this.setState({ isActive: "inactive", activeInput: false });
  };

  handleKeyDown = () => {
    this.setState({ activeInput: true });
  };

  handleKeyPress = e => {
    e.preventDefault();
    if (e.key === "Enter") {
      console.log("Enter has been pressed");
    }
  };

  render() {
    return (
      <form action="" className="ListInput">
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Title"
          className="input-title"
        />
        <div className={`list-items ${this.state.isActive}`}>
          <i className="material-icons">crop_square</i>
          <input
            className="input-list-item"
            type="text"
            name="listItem"
            autoComplete="off"
            placeholder="List item"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            onKeyPress={this.handleKeyPress}
          />
          {this.state.activeInput ? (
            <i className="material-icons">close</i>
          ) : null}
        </div>
        <div className="btn-container">
          <button className="btn">Save</button>
          <button className="btn">Close</button>
        </div>
      </form>
    );
  }
}

export default ListInput;
