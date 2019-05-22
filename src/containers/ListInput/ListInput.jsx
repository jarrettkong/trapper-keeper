import React, { Component } from "react";
import { connect } from "react-redux";
// import { addNote, addList } from '../../actions';
import "./ListInput.scss";

export class ListInput extends Component {
  state = {
    isActive: "inactive",
    mainInput: "",
    title: "",
    notes: []
  };

  handleFocus = () => {
    this.setState({ isActive: "active" });
  };

  handleBlur = () => {
    this.state.displayCloseIcon
      ? this.setState({ isActive: "inactive" })
      : this.setState({ isActive: "inactive" });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newNote = {
        id: Date.now(),
        userTask: this.state.mainInput,
        complete: false
      };
      this.setState({
        notes: [...this.state.notes, newNote],
        mainInput: "",
        displayCloseIcon: false
      });
      console.log("Enter has been pressed");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  handleUpdate = id => {
    return e => {
      const { notes } = this.state;
      const thing = notes.find(note => note.id === id);
      thing.userTask = e.target.value;
      this.setState({ notes });
    };
  };

  render() {
    const existingNotes = this.state.notes.map(note => {
      return (
        <div className="existing-note" key={note.id}>
          <i className="material-icons">crop_square</i>
          <input value={note.userTask} onChange={this.handleUpdate(note.id)} />
        </div>
      );
    });

    return (
      <form className="ListInput" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          autoComplete="off"
          placeholder="Title"
          className="input-title"
          onChange={this.handleChange}
        />
        {existingNotes}
        <div className={`list-items ${this.state.isActive}`}>
          <i className="material-icons">crop_square</i>
          <input
            className="input-list-item"
            type="text"
            name="mainInput"
            value={this.state.mainInput}
            autoComplete="off"
            placeholder="List item"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          {this.state.mainInput.length > 0 ? (
            <i className="material-icons">close</i>
          ) : (
            <i disabled={true} className="material-icons hidden">
              close
            </i>
          )}
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}

export const mapStateToProps = state => ({
  lists: state.lists,
  items: state.items
});

export const mapDispatchToProps = dispatch => ({
  // addList: dispatch(list => addList(list)),
  // addNote: dispatch(item => addNote(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListInput);
