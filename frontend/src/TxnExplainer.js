import React, { useState } from 'react';
import './TxnExplainer.css';
import { ExpandableRow } from './ExplainerComponents/ExpandableRow';
import { autoFormatAmt, toggleFormatAmt } from './utils/formatSats.js'

const AmtSpan = ({val}) => {
  const [amt, setAmt] = useState()

  const toggleAmt = (e) => {
    e.preventDefault()
    if (amt) {
      setAmt((amt) => toggleFormatAmt(amt))
    } else {
      setAmt(toggleFormatAmt(autoFormatAmt(val)));
    }
  }

  return (
    <span onClick={toggleAmt} className="interpreted-val">{amt ? (amt) : (autoFormatAmt(val))}</span>
  )
}

/* 
  
*/
const TxnExplainer = ({txn}) => {

  /*
  nino: neither inputs nor outputs as those keys get special treatment since they need to be broken down further
  */
  const nino = (key) => key !== 'inputs' && key !== 'outputs' && key

  /* 
    keys that are not num_inputs nor num_outputs
  */
  const numi_numo = (key) => key !== 'num_inputs' && key !== 'num_outputs' && key

  const nw = (key) => key !== 'witness'

  const isSegwit = () => txn['segwit'];

  const DetailedExplanations = {
    'version': false,
    'num_inputs': false,
    'txid': true,
    'vout': true,
    'script_sig': isSegwit() ? false : true,
    'witness': true,
    'sequence': false,
    'num_outputs': false,
    'amount': false,
    'scriptPubKey': true,
    'locktime': false
  }

  /* 
  
  */
  const breakdownInputs = (inputs) => {
    const result = inputs.map((input) => {
      // now there's one input
      return (
      <>
        {Object.keys(input).map((key) => {
          const entry = input[key]
          const hex = entry['hex'];
          if (nw(key) && !DetailedExplanations[key]) {
            return (
              <div className="explainer-row">
                <span className={`match-inputs-${key} explainer-hex-value`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</span>
                <div className="explainer-key"><span className="key-name">{key}</span></div>
                { Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
                  return (<div className="explainer-val"><span className="interpreted-val">{entry[k]}</span></div>)
                })}
              </div>
            )
          } else if (nw(key) && DetailedExplanations[key]) {
            return (
              <ExpandableRow cssPrefix={'match-inputs'} id={key} entry={entry} hex={hex}/>
            )
          } else { 
            const witness = entry;
            console.log('witness:', witness)
            return witness.map((witness_entry, index) => {
              const hex = witness_entry['hex']
              const str = witness_entry['str']
              return (
                <ExpandableRow cssPrefix={'match'} id={`witness-${index}`} entry={witness_entry} hex={hex}/>
                // <> 
                //   <div className="explainer-row">
                //     <span className={`match-witness-${index} explainer-hex-value`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</span>
                //     <div className="explainer-key">
                //       <span className="key-name">witness {index}</span>
                //     </div>
                //     <div className="explainer-val">
                //       <span className="interpreted-val">{str}</span>
                //     </div>
                //   </div>
                // </>
              )
            })
        } // else
      })}
      </>
    )})
    return (<>{result}</>)
  }

  /* 
  
  */
  const breakdownOutputs = (outputs) => {
    const result = outputs.map((output) => {
      // now there's one input
      return (<>
      {Object.keys(output).map((key) => {
        const entry = output[key]
        const hex = entry['hex'];
        return (
        <div className="explainer-row">
          <span className={`match-outputs-${key} explainer-hex-value`}>{hex.length > 8 ? (hex.substring(0,8)+'...') : (hex)}</span>
          <div className="explainer-key"><span className="key-name">{key}</span></div>
          {Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
            return (
              <div className="explainer-val">
              { key === 'amount' ? (<AmtSpan val={entry[k]}/>) : (<span className="interpreted-val">{entry[k]}</span>) }
              </div>)
          })}
        </div>
        )
      })}
      </>)
    })
    return (<div>{result}</div>)
  }

  /* 
    returns a hex representation of a key that isn't 'inputs' nor 'outputs'
  */
  const hexOfKey = (key) => {
    if (nino(key)) {
      return (<span className={`match-${key} explainer-hex-value`}>{txn[key]['hex']}</span>)
    }
    else {
      // silently fail i guess
      return (<></>)
    }
  }

  const interpretedValue = (txn, key) => {
    if (key !== 'inputs' && key !== 'outputs') {
      const entry = txn[key]
      return (
        <span className="interpreted-val">
          {/* Shows the non-hex representation of the entry (filter out keys 
            that are hex and make no assumptions about what the name of the key
            is) */}
          {Object.keys(entry).filter((key) => key !== 'hex').map((k) => { 
            return (<span className="interpreted-val">{entry[k]}</span>)
          })}
        </span>
      )
    }
  }

  return (
    <div className="txn-explainer">
      <div className="parsing-breakdown">
        { txn && Object.keys(txn).map((key, index) => {
          if ( nino(key) && numi_numo(key)) {     
            return (
              <div key={index} className="explainer-row">
                {hexOfKey(key)}
                <div className="explainer-key">
                  <div className="key-name">{key}</div>
                </div>
                <div className="explainer-val">
                  {interpretedValue(txn, key)}
                </div>
              </div>
            )
          } else if (key === 'num_inputs') {
            return (<>
            <h3>inputs</h3>
              <div key={index} className="explainer-row">
                {hexOfKey(key)}
                <div className="explainer-key">
                  <div className="key-name">{key}</div>
                </div>
                <div className="explainer-val">
                  {interpretedValue(txn, key)}
                </div>
              </div>
            </>
            )
          } else if (key === 'inputs') {
            return (
            <>{breakdownInputs(txn[key])}</>
            )
          } else if (key === 'num_outputs') {
            return (<>
            <h3>outputs</h3>
            <div key={index} className="explainer-row">
                {hexOfKey(key)}
                <div className="explainer-key">
                  <div className="key-name">{key}</div>
                </div>
                <div className="explainer-val">
                  {interpretedValue(txn, key)}
                </div>
              </div>
            </>)
          } else if (key === 'outputs') {
            return (
              <div>{breakdownOutputs(txn[key])}</div>
            )
          } else {
            return (<></>)
          } 
        })
      }
      </div>
      <div className="details-column">
			</div>
    </div>
  )
}

export { TxnExplainer }

/*
    "tx": {
      "version": {
        "num": 1,
        "hex": "01000000"
      },
      "num_inputs": {
        "num": 1,
        "hex": "01"
      },
      "inputs": [
        {
          "txid": {
            "str": "0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9",
            "hex": "c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704"
          },
          "vout": {
            "num": 0,
            "hex": "00000000"
          },
          "script_sig": {
            "str": "304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901",
            "hex": "4847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901"
          },
          "sequence": {
            "hex": "ffffffff"
          }
        }
      ],
      "num_outputs": {
        "num": 2,
        "hex": "02"
      },
      "outputs": [
        {
          "amount": {
            "num": 1000000000,
            "hex": "00ca9a3b00000000"
          },
          "scriptPubKey": {
            "str": "04ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84c OP_CHECKSIG",
            "hex": "434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac"
          }
        },
        {
          "amount": {
            "num": 4000000000,
            "hex": "00286bee00000000"
          },
          "scriptPubKey": {
            "str": "0411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3 OP_CHECKSIG",
            "hex": "43410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac"
          }
        }
      ],
      "locktime": {
        "num": 0,
        "hex": "00000000"
      }
    }

*/