export const addList = list => {
	return {
		type: 'ADD_LIST',
		payload: { list }
	};
};

export const updateList = list => {
	return {
		type: 'UPDATE_LIST',
		payload: { list }
	};
};

export const deleteList = id => {
	return {
		type: 'DELETE_LIST',
		payload: { id }
	};
};

export const addAllLists = lists => {
	return {
		type: 'ADD_ALL_LISTS',
		payload: { lists }
	};
};

export const deleteCard = id => {
	return {
		type: 'DELETE_CARD',
		payload: { id }
	};
};

// export const addNote = note => {
// 	return {
// 		type: 'ADD_NOTE',
// 		payload: { note }
// 	};
// };

// export const toggleNote = id => {
// 	return {
// 		type: 'TOGGLE_NOTE',
// 		payload: { id }
// 	};
// };

// export const deleteCard = id => {
// 	return {
// 		type: 'DELETE_NOTE',
// 		payload: { id }
// 	};
// };
