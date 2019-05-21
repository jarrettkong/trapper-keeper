import React, { Component } from "react";
import "./ListItem.scss";

class ListItem extends Component {
  state = {
    completed: false
  };

  toggleTaskComplete = () => {
    const toggle = this.state.completed;
    this.setState({ completed: !toggle });
  };

  render() {
    return (
      <div className="ListItem" onClick={this.toggleTaskComplete}>
        {this.state.completed ? (
          <React.Fragment>
            <i className="material-icons checked">check</i>
            <li className="completedTask">{this.props.userTask}</li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <i className="material-icons">crop_square</i>
            <li className="activeTask">{this.props.userTask}</li>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ListItem;
