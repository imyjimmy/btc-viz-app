import React from "react";
import { Txn } from './Txn';
import "./App.css";

import { TransactionIcon } from './TxnIcon';

function App() {

	return (
		<div className="App">
			<nav className="nav">
				{/* <div className='menubutton'>
					<input type='checkbox' id='menubuttoninput'/>
					<label htmlFor='menubuttoninput'>
						<span></span>
						<span></span>
						<span></span>
					</label>
				</div>  */}
				{ process.env.NODE_ENV !== 'production' ? (<div className="node-env">{process.env.NODE_ENV}</div>):(<></>)}
			</nav>
			{/* <header className="App-header"></header> */}
			{/* <h3>Bitcoin Transaction Anatomy</h3> */}
			<div className="container">
				<div className="sidebar-nav">
					<div className="nav-left">
						<div className="sidebar-item">
							<input type='checkbox' id='menubuttoninput'/>
							<label htmlFor='menubuttoninput'>
								<TransactionIcon className="txnIcon" />	
								<div className="sidebar-item-name">Txn</div>
							</label>
						</div>
					</div>
					<div className="nav-right"></div>
					
				</div>
				<Txn />
			</div>
		</div>
	);
}

export default App;

