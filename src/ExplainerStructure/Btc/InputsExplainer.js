import { ExplainerRow } from '../ExplainerRow';
import "./InputsExplainer.scss";
import "../../SyntaxHighlights.css"

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
	console.log('InputsExplainer: ', json)
	const [numInputs, ...inputs] = json;
	return ( 
		<div id={id} className="input-maps-explainer">
			<h4>Inputs</h4>
			<div className="magic-bytes-description"> {/* todo: change className but keep styling */}
				The following are the inputs to this transaction. Inputs are really the outputs of previous transactions. For each input, you will see a reference to previous transactions (namely the <code>txid</code>) where the <code>vout</code> field refers to the output number that constitutes this input.
			</div>
			<h6>Number of Inputs</h6>
			<ExplainerRow keyName={'num'} colorCode={`btc-inputs-num`} hex={numInputs.hex} entry={numInputs} explainerVal={numInputs.num}/>
			{ inputs.map((input, index) => {
				/*{ 
					txid: { hex, str, //bytes }
					vout: { num, hex, //bytes }
					script_sig: { length: { int, hex }}
					witness: [ { num, hex }, { length: { int, hex }, bytes, hex} ]
					sequence: { byte, hex }
				}*/
				return (
				<><h6>Input Number {index}</h6>
				<ul> { /* yes you could also loop over w Object.keys().map but lazy */}
					<li>
						<ExplainerRow keyName={'txid'} colorCode={'btc-inputs-txid'} hex={input.txid.hex} entry={input.txid} explainerVal={input.txid.str}/>
					</li>
					<li>
						<ExplainerRow keyName={'vout'} colorCode={'btc-inputs-vout-num'} hex={input.vout.hex} entry={input.vout} explainerVal={input.vout.num} />
					</li>
					<li> { /* script sig got hands */}
						{/* <ExplainerRow keyName={'scriptSig'} colorCode={'btc-script-sig'} hex={input.script_sig.} /> */}
					</li>
					<li><ExplainerRow keyName={'sequence'} colorCode={'btc-inputs-sequence'} hex={input.sequence.hex} entry={input.sequence} explainerVal={input.sequence.byte}/></li>
          {/* @todo <li>witness</li> */}
				</ul>
				</>
				)
			})}
		</div>
	)
}

export { InputsExplainer }