import "./ExplainerRow.scss";

const ExplainerRow = ({ colorCode, hex, keyName, entry }) => {
  return ( 
  <div className="explainer-row">
    {/* { console.log('explainer, key: ', key, colorCode, hex, entry)} */}
    <div className={`${colorCode} explainer-hex-value`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</div>
    <div className="explainer-key"><div className="key-name">{keyName}</div></div>
    <div className="explainer-val"><code>{entry.bytes}</code></div>
    
    {/* { Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
      return (<div className="explainer-val"><span className="interpreted-val">{entry[k]}</span></div>)
    })} */}
  </div> 
  );
}
 
export { ExplainerRow };