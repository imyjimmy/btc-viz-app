import { useEffect, useRef, useState } from 'react';
import ChevronDoubleDownIcon from '@heroicons/react/16/solid/ChevronDoubleDownIcon';
import '../TxnExplainer.css';
import './ExpandableRow.css'



const ExpandableRow = ({id, entry, hex, cssPrefix}) => {
  const key = id;
  const [isExpanded, setExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0);

  const ref = useRef()

  const toggleExpand = (e) => {
    e.preventDefault()
    setExpanded(!isExpanded)
  }

  useEffect(() => {
    if (ref.current) {
      setContentHeight(300)
    }
  }, [id])

  return (
    <>
    <div className="explainer-row">
      <span className={`${cssPrefix}-${key} explainer-hex-value`}>{hex && hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</span>
      <div className="explainer-key">
        <div className="key-name">{key}</div>
        { process.env.NODE_ENV === 'development' ? (<div className="chevron-icon" onClick={toggleExpand}>
            <ChevronDoubleDownIcon/>
          </div>) : (<></>)} {/* ghetto rollout toggle */}
      </div>
      {/* can put a more advanced script sig explainer component here */}
      {Object.keys(entry).filter((key) => key !== 'hex' && key !== 'length').map((k) => {
        return (<div className="explainer-val"><span className="interpreted-val">{entry[k]}</span></div>)
      })}
    </div>
    <div 
      style={{
        height: isExpanded ? contentHeight : 0,
      }}
    className="explainer-row" ref={ref}>
      { isExpanded ? ('stuff happens'): ('')}
    </div>
    </>
  )
}

export { ExpandableRow }