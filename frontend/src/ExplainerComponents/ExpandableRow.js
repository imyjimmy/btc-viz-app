import { useState } from 'react';
import ChevronDoubleDownIcon from '@heroicons/react/16/solid/ChevronDoubleDownIcon';
import '../TxnExplainer.css';
import './ExpandableRow.css'



const ExpandableRow = ({id, entry, hex, cssPrefix}) => {
  const key = id;
  const [isExpanded, setExpanded] = useState(false)

  const toggleExpand = (e) => {
    e.preventDefault()
    setExpanded(!isExpanded)
  }

  return (
    <div className="explainer-Row">
      <span className={`${cssPrefix}-${key} explainer-hex-value`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</span>
      <div className="explainer-key">
        <div className="key-name">{key}</div>
          <div className="chevron-icon" onClick={toggleExpand}>
            <ChevronDoubleDownIcon/>
          </div>
      </div>
      {/* can put a more advanced script sig explainer component here */}
      {Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
        return (<div className="explainer-val"><span className="interpreted-val">{entry[k]}</span></div>)
      })}
    </div>
  )
}

export { ExpandableRow }