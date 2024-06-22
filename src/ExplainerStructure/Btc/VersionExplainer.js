import { ExplainerRow } from '../ExplainerRow';
import '../Psbt/MagicBytesExplainer.css';

/* 
	{num: 1, hex: "01000000", bytes: "b'\x01\x00\x00\x00'"}
*/
const VersionExplainer = ({ id, json }) => {
	console.log('Version: ', json)
	return (
	<div id={id} className="magic-bytes-explainer">
		<h4>Version</h4>
		<div className="magic-bytes-description">
		These bytes denote the version of this bitcoin transaction. e pluburis whatever the fuck, c'mon. wax even more poetic about the version thing.
		</div>
		<ul>
			<li>
				<ExplainerRow keyName={'version'} colorCode={`btc-version`} hex={json.hex} entry={json} explainerVal={json.int}/>
			</li>
		</ul>
		
	</div>)
}


export { VersionExplainer }