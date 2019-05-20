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

export const addItem = item => {
	return {
		type: 'ADD_ITEM',
		payload: { item }
	};
};

export const toggleItem = id => {
	return {
		type: 'TOGGLE_ITEM',
		payload: { id }
	};
};

export const deleteItem = id => {
	return {
		type: 'DELETE_ITEM',
		payload: { id }
	};
};
