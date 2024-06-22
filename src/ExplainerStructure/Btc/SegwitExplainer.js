import { ExplainerRow } from '../ExplainerRow';
import '../Psbt/MagicBytesExplainer.css';

const SegwitExplainer = ({ id, json }) => {
	/* {hex: '0001'} */
	console.log('Segwit: ', json)
	return (
	<div id={id} className="magic-bytes-explainer">
		<h4>Segwit</h4>
		<div className="magic-bytes-description">
		These bytes denote the version of this bitcoin transaction. e pluburis whatever the fuck, c'mon. wax even more poetic about the version thing. derp derp derp derp derp
		</div>
		<ul>
			<li>
				<ExplainerRow keyName={'version'} colorCode={`btc-version`} hex={json.hex} entry={json} explainerVal={'true'}/>
			</li>
		</ul>
	</div>)
}

export { SegwitExplainer }