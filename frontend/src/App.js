import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [parsedTxn, setParsedTxn] = useState({})

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

	return (
		<div className="App">
			<header className="App-header">
				{/* <h1>React and flask</h1> */}
				{/* Calling a data from setdata for showing */}
				{ console.log('parsedTxn: ', parsedTxn)}
				{/* <p>{data.name}</p>
				<p>{data.age}</p>
				<p>{data.date}</p>
				<p>{data.programming}</p> */}

			</header>
		</div>
	);
}

export default App;

