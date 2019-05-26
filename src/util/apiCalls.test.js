import * as mockData from './mockData';
import * as apiCalls from './apiCalls';
const baseUrl = process.env.REACT_APP_BASE_URL;

describe('apiCalls', () => {
	describe('getAllLists', () => {
		beforeEach(() => {
			window.fetch = jest.fn().mockImplementation(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockData.mockLists)
				})
			);
		});
		it('should call fetch with the correct params', async () => {
			await apiCalls.getAllLists();
			expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/api/v1/lists`);
		});

		it('should return a parsed version of the response when successful', async () => {
			const res = await apiCalls.getAllLists();
			expect(res).toEqual(mockData.mockLists);
		});

		it('should throw an error on fail', async () => {
			window.fetch = jest.fn().mockImplementation(() =>
				Promise.resolve({
					ok: false
				})
			);
			await expect(apiCalls.getAllLists()).rejects.toEqual(Error('Could not get existing lists'));
		});
	});

	describe('addNewList', () => {
		let options;
		beforeEach(() => {
			window.fetch = jest.fn().mockImplementation(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve({ ...mockData.mockList, id: Date.now() })
				})
			);
			options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(mockData.mockList)
			};
		});

		it('should call fetch with the correct params', async () => {
			await apiCalls.addNewList(mockData.mockList);
			expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/api/v1/lists`, options);
		});

		it('should return a list object with a Date.now() id and the data from body', async () => {
			const res = await apiCalls.addNewList(mockData.mockList);
			const expected = { ...mockData.mockList, id: Date.now() };
			expect(res).toEqual(expected);
		});

		it('should return an error if the body params are not correct', async () => {
			window.fetch = jest.fn().mockImplementation(() =>
				Promise.resolve({
					ok: false
				})
			);
			const { mockList } = mockData;
			const badList = { name: mockList.title, notes: mockList.notes };
			await expect(apiCalls.addNewList(badList)).rejects.toEqual(Error('Could not add new list'));
		});
	});
});
