import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addNote, addList } from '../../actions';
import './ListInput.scss';

export class ListInput extends Component {
	state = {
		isActive: 'inactive',
		activeInput: false,
		mainInput: '',
		title: '',
		notes: []
	};

	handleFocus = () => {
		this.setState({ isActive: 'active' });
	};

	handleBlur = () => {
		this.state.activeInput
			? this.setState({ isActive: 'inactive' })
			: this.setState({ isActive: 'inactive', activeInput: false });
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ activeInput: true, [name]: value });
	};

	handleKeyPress = e => {
		if (e.key === 'Enter' && this.state.mainInput) {
			const newNote = { id: Date.now(), userTask: this.state.mainInput, complete: false };
			this.setState({ notes: [...this.state.notes, newNote], mainInput: '' });
			console.log('Enter has been pressed');
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log('submitted');
	};

	handleToggle = id => {
		return () => {
			const { notes } = this.state;
			const note = notes.find(n => n.id === id);
			note.complete = !note.complete;
			this.setState({ notes });
		};
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
		const incompleteNotes = this.state.notes.filter(n => !n.complete).map(note => {
			return (
				<div className="existing-note">
					<i className="material-icons" onClick={this.handleToggle(note.id)}>
						crop_square
					</i>
					<input value={note.userTask} onChange={this.handleUpdate(note.id)} />
				</div>
			);
		});

		const completeNotes = this.state.notes.filter(n => n.complete).map(note => {
			return (
				<div className="existing-note">
					<i className="material-icons" onClick={this.handleToggle(note.id)}>
						check
					</i>
					<input className="complete" value={note.userTask} onChange={this.handleUpdate(note.id)} />
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
				{incompleteNotes}
				{completeNotes.length > 0 && <div className="complete-notes">{completeNotes}</div>}
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
					{this.state.activeInput ? <i className="material-icons">close</i> : null}
				</div>
				<div className="btn-container">
					<button type="submit" className="btn">
						Save
					</button>
					{/* <button className="btn">Close</button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListInput);
