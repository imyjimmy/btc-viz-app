import React, { useEffect, useState } from "react";

import { Page } from '../Layout/Page';
import { BtcTxn } from '../BtcTxn';
import "./Bitcoin.css";
import { TransactionIcon } from '../TxnIcon';
import { isMobile } from 'react-device-detect';


const Bitcoin = ({}) => {
	/* Save Transactions */
	const [txns, setTxns] = useState({})
	const [inputTxn, setInputTxn] = useState()
	const [currentTxn, setCurrentTxn] = useState('')
	
	useEffect(() => {
		const txns = JSON.parse(localStorage.getItem('btc-txns'));
		if (txns) {
		setTxns(txns);
		} else {
			setTxns({})
		}
	}, []);

	const saveTxn = (txnName, inputTxn) => {
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
		setInputTxn(txns[key])
		setCurrentTxn(key)
	}

	return (
		<Page>
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
			{ isMobile ? (<div><h3>Not Mobile Compatible</h3><p>For the best user experience, be sure to access this site on a desktop</p></div>) :
			 (<BtcTxn currentTxn={currentTxn} inputTxn={inputTxn} setInputTxn={setInputTxn} saveTxn={saveTxn} />)
			}
		</Page>
	);
}

export { Bitcoin }