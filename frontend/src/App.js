import React from "react";
import { Txn } from './Txn';
import "./App.css";
import { CustomComponent } from "./CustomComponent";

function App() {

	return (
		<div className="App">
			<nav className="nav">
				<div className='menubutton'>
					<input type='checkbox' id='menubuttoninput'/>
					<label htmlFor='menubuttoninput'>
						<span></span>
						<span></span>
						<span></span>
					</label>
					</div>
			</nav>
			{/* <header className="App-header"></header> */}
			{/* <h3>Bitcoin Transaction Anatomy</h3> */}
			<div className="container">
				<div className="sidebar-column">
				</div>
				<Txn />
				<CustomComponent />
				<div className="details-column">
				</div>
			</div>
		</div>
	);
}

export default App;

