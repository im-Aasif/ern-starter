import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [todo, setTodo] = useState({});
	const fetchData = async () => {
		try {
			const res = await axios.get("/api/todos");
			setTodo(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			<header className="App-header">{JSON.stringify(todo, null, 2)}</header>
		</div>
	);
}

export default App;
