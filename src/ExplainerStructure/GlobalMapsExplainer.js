import { ExplainerRow } from './ExplainerRow';
import { KVEntryExplainer } from './KVEntryExplainer';
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

const GlobalMapsExplainer = ({ id, json }) => {
  console.log('global-bytes: ', json)

  return ( 
    <div id={id} className="global-maps-explainer">
      <h3>Global Map</h3>
      <div className="global-map-description">
      </div>
      <ul>
        <div className="psbt-global-type-b'\x00'-key-len"></div>
      { Object.keys(json).map((key) => { 
        console.log('in map, key: ', key, key.startsWith("b'\\") )
        if (key.startsWith("b'\\") || key.startsWith("b\"\\")) {
          return (<li><KVEntryExplainer colorCode={`psbt-global-type-${key}`} json={json[key]}/></li>)
        } else { /* key="separator" */
          return (
            <li>
              <ExplainerRow keyName={key} colorCode={`psbt-global-${key}`} hex={json[key].hex}  entry={json[key]} />
            </li>
          )
        }
      })}
      </ul>
    </div>
  );
}
 
export { GlobalMapsExplainer }