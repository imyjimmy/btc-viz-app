import './HexValueExplainer.css'
/* 
* PSBT hex values can be very long and are themselves transactions
* needed: fn that takes hex of txn, outputs highlighted txn
*/
const HexValueExplainer = ({ colorCode, hex, json }) => {
  return ( 
  <div className="hex-value-container">
    <div className={`${colorCode} stuff`}>
      {hex}
    </div>
    <div className={`stuff explainer-val`}>
      <code>{json.bytes}</code>
    </div>
  </div> );
}
 
export { HexValueExplainer };