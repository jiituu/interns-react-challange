import rootReducer from "./rootReducer";

import listSaga from './listSaga';
import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware=createSagaMiddleware()
const store =configureStore({
    reducer:rootReducer,
    middleware:()=>[sagaMiddleware]
})


sagaMiddleware.run(listSaga)


export default store;