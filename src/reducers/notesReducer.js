const initialState = [];

export const notesReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_NOTE':
			return [...state, payload.note];
		case 'TOGGLE_NOTE':
			// TBD
			return state;
		case 'DELETE_NOTE':
			return state.filter(note => note.id !== payload.id);
		default:
			return state;
	}
};
