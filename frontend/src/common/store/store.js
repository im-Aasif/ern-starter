import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices.js";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga.js";
import todoReducer from "./todo-slices.js";
import logger from "redux-logger";

const sagaMW = createSagaMiddleware();

export default configureStore({
	reducer: {
		counter: counterReducer,
		todos: todoReducer,
	},
	middleware: (getDefaultMW) => getDefaultMW().concat([sagaMW, logger]),
});

sagaMW.run(mySaga);
