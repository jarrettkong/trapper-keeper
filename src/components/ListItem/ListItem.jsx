import React from "react";
import PropTypes from "prop-types";
import "./ListItem.scss";

const ListItem = props => {
  const { userTask, complete } = props;
  if (complete) {
    return (
      <li className="ListItem completedTask">
        <i className="material-icons checked">check</i>
        <p>{userTask}</p>
      </li>
    );
  } else {
    return (
      <li className="ListItem activeTask">
        <i className="material-icons">crop_square</i>
        <p>{userTask}</p>
      </li>
    );
  }
};

ListItem.propTypes = {
  complete: PropTypes.bool,
  id: PropTypes.number,
  userTask: PropTypes.string
};

export default ListItem;
