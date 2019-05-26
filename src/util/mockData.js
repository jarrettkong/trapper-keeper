export const mockNote = {
	id: Date.now(),
	content: 'Hello, world!',
	complete: false
};

export const mockList = {
	title: 'My List',
	notes: [mockNote, mockNote, mockNote]
};

export const mockLists = [mockList, mockList, mockList];
