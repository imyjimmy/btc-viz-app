import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [parsedTxn, setParsedTxn] = useState({})
	const [input, setInput] = useState()

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from 
		// flask server it will be redirected to proxy
		console.log('fetch: /data')
		fetch("/data").then((res) =>
			res.json().then((resp) => {
				setParsedTxn(resp.data.tx)
			})
		);
	},[]);

	const displayKey = (key) => {
		if (key === 'inputs') {
			const inputs = parsedTxn[key]
			return (<div>displaying inputs</div>)
		}
		return (<div>key: {key}</div>)
	}

	const changeInput = (e) => {
		e.preventDefault()
		setInput(e.target.value)
	}

	const submit = (e) => {
		e.preventDefault()
		fetch("/data" + "?txn=" + input)
	}

	return (
		<div className="App">
			<nav className="nav">
				<div class='menubutton'>
					<input type='checkbox' id='menubuttoninput'/>
					<label for='menubuttoninput'>
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
						<label for="txn">bitcoin transaction</label>
						<textarea name="txn" onChange={changeInput} cols="20" rows="8"></textarea>
						<button onClick={submit}>Submit (temp)</button>
					</div>
					<div className="txn-explainer">
						{/* <h5>Breakdown</h5> */}
						{ console.log('parsedTxn: ', parsedTxn)}				
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

