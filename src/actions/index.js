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
