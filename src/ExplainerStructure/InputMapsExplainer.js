import { ExplainerRow } from './ExplainerRow';
import { KVEntryExplainer } from './KVEntryExplainer';
// import styles from './MagicBytesExplainer.module.css';

/**
 * expected json:
 * {
    "b'\\x00'": {
      "key": {
        "len": {
          "int": 1,
          "hex": "01",
          "base64": "AQ=="
        },
        "bytes": "b'\\x00'",
        "type": "b'\\x00'",
        "data": "b''",
        "hex": "00",
        "base64": "AA=="
      },
      "val": {
        "len": {
          "int": 117,
          "hex": "75",
          "base64": "dQ=="
        },
        "bytes": "b'\\x02\\x00\\x00\\x00\\x01&\\x81q7\\x1e\\xdf\\xf2\\x85\\xe97\\xad\\xee\\xa4\\xb3{x\\x00\\x0c\\x05f\\xcb\\xb3\\xaddd\\x17\\x13\\xcaB\\x17\\x1b\\xf6\\x00\\x00\\x00\\x00\\x00\\xfe\\xff\\xff\\xff\\x02\\xd3\\xdf\\xf5\\x05\\x00\\x00\\x00\\x00\\x19v\\xa9\\x14\\xd0\\xc5\\x99\\x03\\xc5\\xba\\xc2\\x86\\x87`\\xe9\\x0f\\xd5!\\xa4fZ\\xa7e \\x88\\xac\\x00\\xe1\\xf5\\x05\\x00\\x00\\x00\\x00\\x17\\xa9\\x145E\\xe6\\xe3;\\x83,G\\x05\\x0f$\\xd3\\xee\\xb9<\\x9c\\x03\\x94\\x8b\\xc7\\x87\\xb3.\\x13\\x00'",
        "hex": "0200000001268171371edff285e937adeea4b37b78000c0566cbb3ad64641713ca42171bf60000000000feffffff02d3dff505000000001976a914d0c59903c5bac2868760e90fd521a4665aa7652088ac00e1f5050000000017a9143545e6e33b832c47050f24d3eeb93c9c03948bc787b32e1300",
        "base64": "AgAAAAEmgXE3Ht/yhek3re6ks3t4AAwFZsuzrWRkFxPKQhcb9gAAAAAA/v///wLT3/UFAAAAABl2qRTQxZkDxbrChodg6Q/VIaRmWqdlIIisAOH1BQAAAAAXqRQ1RebjO4MsRwUPJNPuuTycA5SLx4ezLhMA"
      }
    },
    "separator": {
      "bytes": "b'\\x00'",
      "hex": "00",
      "base64": "b'AA=='"
    }
  }
 * 
 */

const InputMapsExplainer = ({ id, json }) => {
  return ( 
    <div id={id} className="input-maps-explainer">
      <h4>Input Map</h4>
      <div className="input-map-description">
      </div>
      <h5>Inputs</h5>
      <ul>
        <div className="psbt-input-maps-type-b'\x00'-key-len"></div>
        { Object.keys(json).map((key) => { {/* key is index of input map */}
          if (json[key] != null) {
            return Object.keys(json[key]).map((entry) => {
              if (entry.startsWith("b'\\") || entry.startsWith("b\"\\")) {
                return (<li><KVEntryExplainer colorCode={`psbt-input-maps-${json[key][entry].key.type ? (`-type-${json[key][entry].key.type}`):('')}`} json={json[key][entry]}/></li>)
              } 
              /* key="separator" */
              else { 
                return (
                  <li>
                    <ExplainerRow keyName={entry} colorCode={`psbt-input-maps--${entry}`} hex={json[key][entry].hex}  entry={json[key][entry]} />
                  </li>
                )
              }
            })
          }})
        }
      </ul>
    </div>
  );
}
 
export { InputMapsExplainer }