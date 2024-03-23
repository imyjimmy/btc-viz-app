import React from "react";
import { Txn } from './Txn';
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
				<Txn />
				<div className="details-column">
				</div>
			</div>
		</div>
	);
}

export default App;

