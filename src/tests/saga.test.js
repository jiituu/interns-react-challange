import { put, takeEvery } from "redux-saga/effects";
import { getList, listSaga } from "../redux/listSaga";
import { LIST_DATA, SET_LIST } from "../redux/constant";

// Mocking the fetch function
jest.mock('node-fetch');

describe('listSaga', () => {
  // Test the getList saga
  describe('getList saga', () => {
    const generator = getList();

    it('should fetch data and dispatch SET_LIST action if request succeeds', () => {
      const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ results: [{ name: 'Luke Skywalker', height: '172' }] }) };
      const fetchMock = jest.fn().mockResolvedValue(mockResponse);

      // Replace the global fetch with the mocked version
      global.fetch = fetchMock;

      // Test saga execution
      expect(generator.next().value).toEqual(fetch("https://swapi.py4e.com/api/people/"));
      expect(generator.next(mockResponse).value).toEqual(put({ type: SET_LIST, data: [{ name: 'Luke Skywalker', height: '172' }] }));
    });

    it('should log error if request fails', () => {
      const error = new Error('Failed to fetch data');
      const mockResponse = { ok: false };
      const fetchMock = jest.fn().mockResolvedValue(mockResponse);

      // Replace the global fetch with the mocked version
      global.fetch = fetchMock;

      // Test saga execution
      expect(generator.next().value).toEqual(fetch("https://swapi.py4e.com/api/people/"));
      expect(generator.throw(error).value).toEqual(console.error('Error occurred while fetching data:', error));
    });
  });

  // Test the listSaga itself
  describe('listSaga', () => {
    const saga = listSaga();

    it('should watch for LIST_DATA action and call getList saga', () => {
      expect(saga.next().value).toEqual(takeEvery(LIST_DATA, getList));
    });
  });
});
