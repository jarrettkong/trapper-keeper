import React, { Component } from "react";
import "./ListItem.scss";

class ListItem extends Component {
  render() {
    const { userTask, complete } = this.props
    return (
      <div className="ListItem" onClick={this.toggleTaskComplete}>
        {complete ? (
          <React.Fragment>
            <i className="material-icons checked">check</i>
            <li className="completedTask">{userTask}</li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <i className="material-icons">crop_square</i>
            <li className="activeTask">{userTask}</li>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ListItem;
