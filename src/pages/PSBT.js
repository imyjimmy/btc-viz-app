import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { Page } from '../Layout/Page';
import { PsbtTxn } from '../PsbtTxn';
import styles from "./PSBT.module.css";
import { TransactionIcon } from '../TxnIcon';

const PSBT = ({}) => {
  /* psbt from route*/
  const { psbt } = useParams();
	/* Save Transactions */
	const [txns, setTxns] = useState({})
	const [inputTxn, setInputTxn] = useState()
	const [currentTxn, setCurrentTxn] = useState('')
	
	useEffect(() => {
		const txns = JSON.parse(localStorage.getItem('psbt-txns'));
		if (txns) {
		setTxns(txns);
		} else {
			setTxns({})
		}
	}, []);

	const saveTxn = (txnName, inputTxn) => {
		const _txns = localStorage.getItem('psbt-txns')
		let txns; 
		if (_txns) {
			txns = JSON.parse(_txns)
		}
		
		if (txns) {
			txns[txnName] = inputTxn
			localStorage.setItem('psbt-txns', JSON.stringify(txns))
			setTxns(txns)
		} else {
			localStorage.setItem('psbt-txns', JSON.stringify({ [txnName]: inputTxn}))
			setTxns({[txnName]: inputTxn})
		}

	}

	const selectTxn = (key) => (e) => {
		setInputTxn(txns[key])
		setCurrentTxn(key)
	}

	return (
		<Page>
			<div className={styles["sidebar-nav"]}>
				<div className={styles["nav-left"]}> {/* "left" side of sidebar */}
					<div className={styles["sidebar-item"]}>
						<input type='checkbox' id='menubuttoninput'/>
						<label htmlFor='menubuttoninput'>
							<TransactionIcon className={styles["txnIcon"]} />	
							<div className={styles["sidebar-item-name"]}>Txn</div>
						</label>
					</div>
				</div>
				<div className={styles["nav-right"]}> {/* "right" side of sidebar */}
					<h4>Transactions</h4>
					{ Object.keys(txns).map(key => <div><button onClick={selectTxn(key)}>{key}</button></div>) }
				</div>
			</div>
			<PsbtTxn currentTxn={currentTxn ?? ''} inputTxn={inputTxn ?? psbt} setInputTxn={setInputTxn} saveTxn={saveTxn} psbtParam={psbt}/>
		</Page>
	);
}

export { PSBT }