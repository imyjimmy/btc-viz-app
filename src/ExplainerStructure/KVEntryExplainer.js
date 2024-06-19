import { ExplainerRow } from './ExplainerRow';
import { HexValueExplainer } from './HexValueExplainer';
import './KVEntryExplainer.css';
/**
 * expected json example:
 * {
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
  }
 */

const KVEntryExplainer = ({colorCode, json}) => {
  return ( 
  <div>
    {/* Explain Key */}
    <h4>Key: <code className={`${colorCode}-key`}>{json.key.hex}</code></h4>
    <ul>
      <li> {/* length */}
        <ExplainerRow keyName={'length'} colorCode={`${colorCode}-key-len`} hex={json.key.len.hex} entry={json.key.len} />
      </li>
      <li>
        { /* key hex is causing output map div to be wider than others*/}
        { json.key.hex && json.key.hex.length <= 8 ? (<ExplainerRow keyName={'hex'} colorCode={`${colorCode}-key`} hex={json.key.hex} entry={json.key} />) : (<HexValueExplainer colorCode={`${colorCode}-key`} hex={json.key.hex} json={json.key}/>) }
      </li>
      <li>
        <ExplainerRow keyName={'type'} colorCode={`${colorCode}-type`} hex={json.key.type} entry={json.key.type} />
      </li>
      <li>
      <ExplainerRow keyName={'data'} colorCode={`${colorCode}-data`} hex={json.key.data} entry={json.key.data} />
      </li>
    </ul>

    {/* problem: hex could be undefined*/}
    { json.val ? (
    <>
      {console.log('json: ', json.val, json.val.hex)}
      <h4>Value: <code className={`${colorCode}-val`}>{json.val.hex.length > 16 ? (json.val.hex.substring(0,32)+'...') : (json.val.hex)}</code></h4>
      <ul>
        <li> {/* length */}
          <ExplainerRow keyName={'length'} colorCode={`${colorCode}-val-len`} hex={json.val.len.hex} entry={json.val.len} />
        </li>
          {/* <li><ExplainerRow keyName={'hex'} colorCode={`${colorCode}-val`} hex={json.val.hex} entry={json.val} /></li> */}
        <li>
          <HexValueExplainer colorCode={`${colorCode}-val`} hex={json.val.hex} json={json.val}/>
        </li>
      </ul>
    </>
    )
    :(<div className="empty-value-explanation">empty value</div>)}
  </div>
  
)}
 
export { KVEntryExplainer };