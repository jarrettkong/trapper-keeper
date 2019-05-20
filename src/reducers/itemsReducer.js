export const itemsReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_ITEM':
			return [...state, payload.item];
		case 'TOGGLE_ITEM':
      // TBD
			break;
		case 'DELETE_ITEM':
			return state.filter(item => item.id !== payload.id);
		default:
			return state;
	}
};