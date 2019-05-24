const initialState = [];

export const listsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_LISTS":
      return payload.lists;
    case "ADD_LIST":
      return [...state, payload.list];
    case "DELETE_CARD":
      console.log("firing delete card reducer");
      return state.filter(list => list.id !== payload.id);
    default:
      return state;
  }
};
