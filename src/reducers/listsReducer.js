const initialState = [];

export const listsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_ALL_LISTS':
			return payload.lists;
		case 'ADD_LIST':
			return [...state, payload.list];
		case 'UPDATE_LIST':
			const newState = [...state];
			const index = newState.findIndex(list => list.id === payload.list.id);
			newState.splice(index, 1, payload.list);
			return newState;
		case 'DELETE_LIST':
			return state.filter(list => list.id !== payload.id);
		default:
			return state;
	}
};
