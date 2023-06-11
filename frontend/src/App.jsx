import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import {
	RouterProvider,
	createBrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import { connect, useDispatch, useSelector } from "react-redux";

function App() {
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();
	const mainRoutes = [
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "about",
			element: <About />,
		},
		{
			path: "contact",
			element: <Contact />,
		},
	];
	// const [todo, setTodo] = useState({});
	const fetchData = async () => {
		try {
			dispatch({ type: "GET_TODOS" });
			// const res = await axios.get("/api/todos");
			// setTodo(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="main">
				<NavigationBar />
			</div>
			<div>{JSON.stringify(todos)}</div>
			<Routes>
				{mainRoutes.map((rout) => (
					<Route path={rout.path} element={rout.element} />
				))}
			</Routes>
		</>
	);
}

export default App;
