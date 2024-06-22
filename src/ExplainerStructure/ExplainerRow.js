import "./ExplainerRow.scss";

// explainer-hex-value psbt-output-maps--type-undefined-key-len
const ExplainerRow = ({ colorCode, hex, keyName, entry, explainerVal }) => {
  return ( 
    hex && (<div className="explainer-row">
      <div className={`explainer-hex-value ${colorCode}`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</div>
      <div className="explainer-key"><div className="key-name">{keyName}</div></div>
			{/* todo--this needs more expressiveness */}
      <div className="explainer-val">
				{ explainerVal ? (<>{explainerVal}</>) : (
					<>
						{keyName === 'length' && entry.int ? (<><code>{entry.bytes}</code> <span>=&gt;</span>{entry.int} bytes long</>
						):(<code>{entry.bytes ?? ''}</code>)}
					</>
				)}
			</div>
			
        {/* ternary on keyName == length... */}
        {/* { Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
          return (<div className="explainer-val"><span className="interpreted-val">{entry[k]}</span></div>)
        })} */}
    </div>)
  );
}
 
export { ExplainerRow };