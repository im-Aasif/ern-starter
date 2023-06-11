import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { save } from "./todo-slices";

function* fetchTodos(action) {
	if (action.type === "GET_TODOS") {
		try {
			const todos = yield axios.get("/api/todos");
			yield put(save([todos.data]));
		} catch (e) {
			console.log(e);
		}
	}
}

function* mySaga() {
	yield takeLatest("GET_TODOS", fetchTodos);
}

export default mySaga;
