/*
inputs: [
	{ num: 1, hex: '01' },
	{ 
		txid: { hex, str, //bytes }
		vout: { num, hex, //bytes }
		script_sig: { length: { int, hex }}
		witness: [ { num, hex }, { length: { int, hex }, bytes, hex} ]
		sequence: { byte, hex }
	}
]
*/

const InputsExplainer = ({ id, json }) => {
	console.log('inputs: ', json)
	const [numInputs, ...inputs] = json;
	return ( 
		<div id={id} className="input-maps-explainer">
			<h4>Inputs</h4>
			<div className="magic-bytes-description">
				Inputs inputs inputs!! Inputs are outputs!!!
			</div>
			<ul>
				<li>

				</li>
			</ul>
		</div>
	)
}

export { InputsExplainer }