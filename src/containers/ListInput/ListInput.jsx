import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions";
import * as apiCalls from "../../util/apiCalls";
import "./ListInput.scss";

export class ListInput extends Component {
	state = {
		isActive: false,
		main: '',
		title: '',
		notes: [],
		error: ''
	};

	componentDidMount() {
		this.getExistingInfo();
	}

	getExistingInfo = async () => {
		const { id } = this.props;
		if (id) {
			try {
				const list = await apiCalls.getListData(id);
				const { title, notes } = list;
				this.setState({ title, notes, error: '' });
			} catch (error) {
				this.setState({ error: error.message });
			}
		}
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.saveNote();
		}
	};

	saveNote = () => {
		const { main, notes } = this.state;
		if (main) {
			const newNote = { id: Date.now(), userTask: main, complete: false };
			this.setState({ notes: [...notes, newNote], main: '', isActive: false });
		}
	};

	handleSave = async () => {
		const { lists, id } = this.props;
		const { title, notes } = this.state;
		const existing = lists.find(list => list.id === parseInt(id));
		if (existing) {
			const listToUpdate = { id: parseInt(id), title, notes };
			await this.updateList(listToUpdate);
		} else {
			const listData = { title: title || 'Untitled List', notes };
			await this.createNewList(listData);
		}
		this.props.history.push('/');
	};

	createNewList = async listData => {
		try {
			const list = await apiCalls.addNewList(listData);
			this.props.addList(list);
			this.setState({ title: '', main: '', notes: [], error: '' });
		} catch (error) {
			this.setState({ error: error.message });
		}
	};

	updateList = async list => {
		try {
			await apiCalls.updateList(list);
			this.props.updateList(list);
		} catch (error) {
			this.setState({ error });
		}
	};

	// TODO refactor to modifyNote
	deleteNote = id => {
		return () => {
			const notes = this.state.notes.filter(note => note.id !== id);
			this.setState({ notes });
		};
	};

	modifyNote = (method, id) => {
		const { notes } = this.state;
		const note = notes.find(n => n.id === id);
		return e => {
			if (method === 'toggle') {
				note.complete = !note.complete;
			} else if (method === 'update') {
				note.userTask = e.target.value;
			}
			this.setState({ notes });
		};
	};

	returnHome = e => {
		const { classList } = e.target;
		classList.contains('modal') && this.props.history.push('/');
	};

	render() {
		const { title, isActive, main, notes } = this.state;
		const incompleteNotes = notes.filter(n => !n.complete).map(note => {
			return (
				<div key={note.id} className="existing-note">
					<i className="material-icons toggle-icon" onClick={this.modifyNote('toggle', note.id)}>
						crop_square
					</i>
					<input className="existing-note-input" value={note.userTask} onChange={this.modifyNote('update', note.id)} />
					<i className="material-icons delete-icon" onClick={this.deleteNote(note.id)}>
						close
					</i>
				</div>
			);
		});

		const completeNotes = notes.filter(n => n.complete).map(note => {
			return (
				<div key={note.id} className="existing-note">
					<i className="material-icons toggle-icon" onClick={this.modifyNote('toggle', note.id)}>
						check
					</i>
					<input
						className="existing-note-input complete"
						value={note.userTask}
						onChange={this.modifyNote('update', note.id)}
					/>
					<i className="material-icons delete-icon" onClick={this.deleteNote(note.id)}>
						close
					</i>
				</div>
			);
		});

		return (
			<div className="modal" onClick={this.returnHome}>
				<form className="ListInput">
					<input
						type="text"
						name="title"
						value={title}
						autoComplete="off"
						placeholder="Title"
						className="input-title"
						onChange={this.handleChange}
					/>
					{incompleteNotes}
					{completeNotes.length > 0 && <div className="complete-notes">{completeNotes}</div>}
					<div className={`list-items ${isActive && 'active'}`}>
						<i className="material-icons">crop_square</i>
						<input
							className="input-list-item"
							type="text"
							name="main"
							value={main}
							autoComplete="off"
							placeholder="New Item"
							onFocus={() => this.setState({ isActive: true })}
							onBlur={this.saveNote}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
						/>
						{main.length > 0 ? (
							<i className="material-icons" onClick={() => this.setState({ main: '' })}>
								close
							</i>
						) : (
							<i disabled={true} className="material-icons hidden">
								close
							</i>
						)}
					</div>
					<div className="btn-container">
						<div role="button" className="btn" onClick={this.handleSave}>
							Save
						</div>
					</div>
				</form>
			</div>
		);
	}

}

ListInput.propTypes = {
  addList: PropTypes.func,
  updateList: PropTypes.func,
  list: PropTypes.array
};

export const mapStateToProps = state => ({
  lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
  addList: list => dispatch(actions.addList(list)),
  updateList: list => dispatch(actions.updateList(list))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListInput);
