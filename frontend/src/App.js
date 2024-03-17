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
			{/* <header className="App-header"></header> */}
			<div className="txn-input">
				<h3>Input a Raw Transaction</h3>
				<input type="text" onChange={changeInput}></input>
				<button onClick={submit}>Submit (temp)</button>
			</div>
			<div className="txn-explainer">
				{/* <h1>React and flask</h1> */}
				{/* Calling a data from setdata for showing */}
				{ console.log('parsedTxn: ', parsedTxn)}
				{/* <p>{data.name}</p>
				<p>{data.age}</p>
				<p>{data.date}</p>
				<p>{data.programming}</p> */}
				{ parsedTxn && Object.keys(parsedTxn).map(key => {
						return (<div><div>{key}</div>
							<div>{displayKey(key)}</div>
						</div>)
					}
				)}
			</div>
		</div>
	);
}

export default App;

