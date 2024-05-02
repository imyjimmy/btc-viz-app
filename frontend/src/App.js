import React, { useEffect, useState } from "react";
import { Txn } from './Txn';
import "./App.css";

import { TransactionIcon } from './TxnIcon';

function App() {
	/* Save Transactions */
	const [txns, setTxns] = useState({})
	const [inputTxn, setInputTxn] = useState()
	
	useEffect(() => {
		const txns = JSON.parse(localStorage.getItem('btc-txns'));
		if (txns) {
		setTxns(txns);
		} else {
			setTxns({})
		}
	}, []);

	const saveTxn = (txnName, inputTxn) => {
		// console.log('save txn:', txnName, inputTxn)
		const _txns = localStorage.getItem('btc-txns')
		let txns; 
		if (_txns) {
			txns = JSON.parse(_txns)
		}
		
		if (txns) {
			txns[txnName] = inputTxn
			localStorage.setItem('btc-txns', JSON.stringify(txns))
			setTxns(txns)
		} else {
			localStorage.setItem('btc-txns', JSON.stringify({ [txnName]: inputTxn}))
			setTxns({[txnName]: inputTxn})
		}

	}

	const selectTxn = (key) => (e) => {
		console.log('hey: ', e, key, txns[key]);
		setInputTxn(txns[key])
	}

	return (
		<div className="App">
			<nav className="nav">
				{ process.env.NODE_ENV !== 'production' ? (<div className="node-env">{process.env.NODE_ENV}</div>):(<></>)}
			</nav>
			<div className="container">
				<div className="sidebar-nav">
					<div className="nav-left"> {/* "left" side of sidebar */}
						<div className="sidebar-item">
							<input type='checkbox' id='menubuttoninput'/>
							<label htmlFor='menubuttoninput'>
								<TransactionIcon className="txnIcon" />	
								<div className="sidebar-item-name">Txn</div>
							</label>
						</div>
					</div>
					<div className="nav-right"> {/* "right" side of sidebar */}
						<h4>Transactions</h4>
						{ Object.keys(txns).map(key => <div><button onClick={selectTxn(key)}>{key}</button></div>) }
					</div>
				</div>
				<Txn inputTxn={inputTxn} setInputTxn={setInputTxn} saveTxn={saveTxn} />
			</div>
		</div>
	);
}

export default App;

