export const addList = list => {
	return {
		type: 'ADD_LIST',
		payload: { list }
	};
};

export const deleteList = id => {
	return {
		type: 'DELETE_LIST',
		payload: { id }
	};
};

export const addLists = lists => {
	return {
		type: 'ADD_LISTS',
		payload: {lists}
	}
}

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

// export const deleteNote = id => {
// 	return {
// 		type: 'DELETE_NOTE',
// 		payload: { id }
// 	};
// };
