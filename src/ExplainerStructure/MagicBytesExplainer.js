import './MagicBytesExplainer.css';
import { ExplainerRow } from './ExplainerRow';

/* 
expected json: {
  "magic_bytes": {
    "bytes": "b'psbt'",
    "hex": "70736274",
    "base64": "cHNidA=="
  },
  "head_separator": {
    "bytes": "b'\\xff'",
    "hex": "ff",
    "base64": "/w=="
  }
}
*/

const MagicBytesExplainer = ({ id, json }) => {
  console.log('magic: ', json)
  return (
  <div id={id} className="magic-bytes-explainer">
    <h3>Magic Bytes</h3>
    <div className="magic-bytes-description">
    Magic bytes signify the start of a PSBT transaction. The special code is ASCII for "psbt" and are followed by a separator of `0xFF` (hexadecimal literal). For more information, see <a href="https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki">the official bip</a>
    </div>
    <ul>
    { Object.keys(json).map((key) => { 
      return <li><ExplainerRow keyName={key} colorCode={`psbt-magic-${key}`} hex={json[key].hex} entry={json[key]} /></li>
    })}
    </ul>
    
  </div>)
}

export { MagicBytesExplainer }