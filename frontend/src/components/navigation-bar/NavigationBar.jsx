import React from "react";
import logo from "../../assets/comp-logo.svg";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
function NavigationBar() {
	const routes = [
		{
			path: "/",
			pathName: "Home",
		},
		{
			path: "about",
			pathName: "About",
		},
		{
			path: "contact",
			pathName: "Contact",
		},
	];
	function hideOnMobile() {}
	return (
		<nav className="navBar">
			<img src={logo} className="mainLogo" alt="main logo" />

			<ul className="navLinks">
				<input type="checkbox" id="checkbox_toggle" />
				<label for="checkbox_toggle" class="hamburger">
					&#9776;
				</label>
				<div className="menu">
					{routes.map((rout) => (
						<li key={rout.pathName}>
							<a href="" onClick={hideOnMobile()}>
								<Link to={rout.path}>{rout.pathName}</Link>
							</a>
						</li>
					))}
					{/* <li className="hamburgerMenu">
						<input type="checkbox" id="checkbox_toggle" />
						<label for="checkbox_toggle" class="hamburger">
							&#9776;
						</label>
						<a href="">&#9776;</a>
						<ul className="dropdown">
							<li>
								<a href="">Engg and Tech</a>
							</li>
							<li>
								<a href="">Home</a>
							</li>
							<li>
								<a href="">Home</a>
							</li>
						</ul>
					</li> */}
				</div>
			</ul>
		</nav>
	);
}
export default NavigationBar;
