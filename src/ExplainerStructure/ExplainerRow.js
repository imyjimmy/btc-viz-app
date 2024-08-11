import "./ExplainerRow.scss"; // should be import style from ... .module.scss 
import "../SyntaxHighlights.css"
// explainer-hex-value psbt-output-maps--type-undefined-key-len
const ExplainerRow = ({ colorCode, hex, keyName, entry, explainerVal }) => {
  return ( 
    hex && (<div className="explainer-row">
      <div className={`explainer-hex-value`}>
				{hex.length > 8 ? (
					<span className={colorCode}>{hex.substring(0,8)+'...'}</span>) : (<span className={colorCode}>{hex}</span>)}</div>
      <div className="explainer-key"><div className="key-name">{keyName}</div></div>
			{/* todo--this needs more expressiveness */}
      <div className="explainer-val">
				{ explainerVal != undefined ? (<>{explainerVal}</>) : (
					<>
					{ console.log('explainer!!!', explainerVal)}
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