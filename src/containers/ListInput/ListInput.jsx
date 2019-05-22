import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions';
import { addNewList } from '../../util/apiCalls';
import './ListInput.scss';

export class ListInput extends Component {
	state = {
		isActive: 'inactive',
		mainInput: '',
		title: '',
		notes: []
	};

	handleFocus = () => {
		this.setState({ isActive: 'active' });
	};

	handleBlur = () => {
		this.state.displayCloseIcon ? this.setState({ isActive: 'inactive' }) : this.setState({ isActive: 'inactive' });
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleKeyPress = e => {
		if (e.key === 'Enter' && this.state.mainInput) {
			const newNote = { id: Date.now(), userTask: this.state.mainInput, complete: false };
			this.setState({ notes: [...this.state.notes, newNote], mainInput: '', displayCloseIcon: false });
		}
	};

	handleSubmit = async () => {
		const { title, notes } = this.state;
		try {
			const list = await addNewList({ title: title || 'Untitled List', notes });
			this.props.addList(list);
		} catch (err) {
			console.log(err);
		}
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
				<div key={note.id} className="existing-note">
					<i className="material-icons" onClick={this.handleToggle(note.id)}>
						crop_square
					</i>
					<input value={note.userTask} onChange={this.handleUpdate(note.id)} />
				</div>
			);
		});

		const completeNotes = this.state.notes.filter(n => n.complete).map(note => {
			return (
				<div key={note.id} className="existing-note">
					<i className="material-icons" onClick={this.handleToggle(note.id)}>
						check
					</i>
					<input className="complete" value={note.userTask} onChange={this.handleUpdate(note.id)} />
				</div>
			);
		});

		return (
			<form className="ListInput">
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
					{this.state.mainInput.length > 0 ? (
						<i className="material-icons">close</i>
					) : (
						<i disabled={true} className="material-icons hidden">
							close
						</i>
					)}
				</div>
				<div className="btn-container">
					<div role="button" className="btn" onClick={this.handleSubmit}>
						Save
					</div>
					{/* <button className="btn">Close</button> */}
				</div>
			</form>
		);
	}
}

export const mapDispatchToProps = dispatch => ({
	addList: list => dispatch(addList(list))
});

export default connect(null, mapDispatchToProps)(ListInput);
