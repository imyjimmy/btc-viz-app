import './HexValueExplainer.css'
/* 
* PSBT hex values can be very long and are themselves transactions
* needed: fn that takes hex of txn, outputs highlighted txn
* consider renaming this component to "vertical hex val explainer" 
* or something
*
*/
const HexValueExplainer = ({ colorCode, hex, json }) => {
  return ( 
  <div className="hex-value-container">
    <div className="stuff key-name">hex</div>
    <div className={`${colorCode} stuff`}>
      {hex}
    </div>
    <div className="stuff key-name">bytes</div>
    {/* explainer-val from TxnExplainer.css */}
    <div className={`stuff explainer-val`}>
      <code>{json.bytes}</code>
    </div>
  </div> );
}
 
export { HexValueExplainer };