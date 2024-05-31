import "./ExplainerRow.scss";

const ExplainerRow = ({ colorCode, hex, keyName, entry }) => {
  return ( 
    hex && (<div className="explainer-row">
      <div className={`explainer-hex-value ${colorCode}`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</div>
      <div className="explainer-key"><div className="key-name">{keyName}</div></div>
      <div className="explainer-val">{keyName === 'length' && entry.int ? (<><code>{entry.bytes}</code> <span>=&gt;</span>{entry.int} bytes long</>
      ):(<code>{entry.bytes ?? ''}</code> )}</div>
        {/* ternary on keyName == length... */}
        {/* { Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
          return (<div className="explainer-val"><span className="interpreted-val">{entry[k]}</span></div>)
        })} */}
    </div>)
  );
}
 
export { ExplainerRow };