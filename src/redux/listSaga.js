import { takeEvery, put } from "redux-saga/effects";
import { LIST_DATA, SET_LIST } from "./constant";

export function* getList() {
    try {
        console.warn('get list saga called')
        const response = yield fetch("https://swapi.py4e.com/api/people/");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = yield response.json();
        yield put({
            type: SET_LIST,
            data: data.results
        });
    } catch (error) {
        console.error('Error occurred while fetching data:', error);
        
    }
}

function* listSaga() {
    yield takeEvery(LIST_DATA, getList);
}

export default listSaga;
