import React, { useState, useEffect } from "react";
import { updateMatchers } from './matchers';
import "./App.css";

function App() {
	const [inputTxn, setInputTxn] = useState()
	const [parsedTxn, setParsedTxn] = useState({})

	// Using useEffect for single rendering
	// useEffect(() => {
	// 	// Using fetch to fetch the api from 
	// 	// flask server it will be redirected to proxy
	// 	console.log('fetch: /data')
	// 	fetch("/data").then((res) => {
	// 		if (res.status === 200) {
	// 			res.json().then((resp) => {
	// 				setParsedTxn(resp.data.tx)
	// 			})
	// 		} else {
	// 			console.error('fetch error')
	// 		}
	// 	}
	// 	);
	// },[]);

	const displayKey = (key) => {
		if (key === 'inputs') {
			const inputs = parsedTxn[key]
			return (<div>displaying inputs</div>)
		}
		return (<div>key: {key}</div>)
	}

	const changeInput = (e) => {
		e.preventDefault()
		setInputTxn(e.target.value)
	}

	// source: https://www.freecodecamp.org/news/javascript-debounce-example/
	function debounce(func, timeout = 1000){
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	}

	const conditionalFetch = async () => {
		return inputTxn.length % 2 == 0 ? await fetch("/data" + "?txn=" + inputTxn).then((resp) => { if (!resp.ok) 
			{ throw new Error(`HTTP Error: ${resp.status}`)} 
			return resp.json() 
		}) : (undefined)
	}

	const fetchTxn = async () => {
		const resp = await conditionalFetch()
		console.log('resp:', resp)
		if (resp !== undefined) {
			setParsedTxn(resp.data.tx)
		}
	}

	useEffect(() => {
		const thing = updateMatchers(parsedTxn);
		console.log('matchers: ', thing)
	}, [parsedTxn])

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
				<div className="txn-column">
					<div className="txn-input">
						<label htmlFor="txn">bitcoin transaction</label>
						<textarea name="txn" 
							onChange={changeInput} 
							onKeyUp={debounce(() => fetchTxn())}
							cols="20" 
							rows="8"
						/>
					</div>
					<div className="txn-explainer">
						{/* <h5>Breakdown</h5> */}
						{/* { console.log('parsedTxn: ', parsedTxn)}				 */}
						{ parsedTxn && Object.keys(parsedTxn).map(key => {
								return (<div><div>{key}</div>
									<div>{displayKey(key)}</div>
								</div>)
							}
						)}
					</div>
				</div>
				<div className="details-column">

				</div>
			</div>
		</div>
	);
}

export default App;

