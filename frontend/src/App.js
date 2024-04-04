import React from "react";
import { Txn } from './Txn';
import "./App.css";

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
				<div className="node-env">{process.env.NODE_ENV !== 'production' ? (<h3>{process.env.NODE_ENV}</h3>):(<></>)}</div>
			</nav>
			{/* <header className="App-header"></header> */}
			{/* <h3>Bitcoin Transaction Anatomy</h3> */}
			<div className="container">
				<div className="sidebar-column">
				</div>
				<Txn />
			</div>
		</div>
	);
}

export default App;

