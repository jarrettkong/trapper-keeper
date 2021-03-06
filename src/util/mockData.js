export const mockNote = {
	id: Date.now(),
	userTask: 'Hello, world!',
	complete: false
};

export const completeNote = {
	id: Date.now(),
	userTask: 'I am complete',
	complete: true
};

export const mockList = {
	id: 999,
	title: 'My List',
	notes: [mockNote, mockNote, mockNote]
};

export const mockPartialCompleteList = {
	title: 'Complete list',
	notes: [mockNote, completeNote, mockNote]
};

export const mockLists = [mockList, mockList, mockList];

export const mockState = {
	lists: mockLists
};

export const mockHistory = {
	push: (path, state = ['/dir']) => state.push(path)
};
