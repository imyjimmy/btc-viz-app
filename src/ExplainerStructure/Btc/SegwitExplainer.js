import { ExplainerRow } from '../ExplainerRow';
import '../Psbt/MagicBytesExplainer.css'; // compromise for now

const SegwitExplainer = ({ id, json }) => {
	/* expected JSON: {hex: '0001'} */
	return (
	<div id={id} className="magic-bytes-explainer">
		<h4>Segwit</h4>
		<div className="magic-bytes-description">
		These bytes denote the version of this bitcoin transaction. e pluburis whatever the fuck, c'mon. wax even more poetic about the version thing. derp derp derp derp derp
		</div>
		<ul>
			<li>
				<ExplainerRow keyName={'segwit'} colorCode={`btc-segwit`} hex={json.hex} entry={json} explainerVal={'true'}/>
			</li>
		</ul>
	</div>)
}

export { SegwitExplainer }