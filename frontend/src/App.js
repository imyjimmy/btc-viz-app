import React, { useState, useEffect } from "react";
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

	const conditionalFetch = () => {
		return inputTxn.length % 2 == 0 ? fetch("/data" + "?txn=" + inputTxn).then(resp => resp.json()) : ({})
	}

	// const submit = (e) => {
	// 	e.preventDefault()
	// 	fetch("/data" + "?txn=" + inputTxn)
	// }

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
							onKeyUp={debounce(() => conditionalFetch())} 
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

