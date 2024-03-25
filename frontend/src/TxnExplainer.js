import React, { useState } from 'react';
import './TxnExplainer.css';

const TxnExplainer = ({txn}) => {

  const nino = (key) => key !== 'inputs' && key !== 'outputs'

  const hexInput = (key) => {
    if (nino(key)) {
      return (<span className={`match-${key} explainer-hex-value`}>{txn[key]['hex']}</span>)
    }
    if (key === 'inputs') {
      // const inputs = txn[key]
      // //var hex = ''
      // var thing = inputs.map((input) => {
      //   return Object.keys(input).map((inputKeys) => {
      //     return input[inputKeys]['hex']
      //   })
      // })
      // return thing;
    }
  }

  const explainInput = (input) => {
    console.log('explaining input')
    return (<div>derp</div>)
  }

  const explainOutput = (output) => {
    console.log('explaining input')
    return (<div></div>)
  }

  const interpretedValue = (key) => {
    if (key !== 'inputs' && key !== 'outputs') {
      const entry = txn[key]
      return (
        <>
          {Object.keys(entry).filter((key) => key !== 'hex').map((k) => {
            return (<span className="interpreted-val">{entry[k]}</span>)
          })}
        </>
      )
    }
  }

  const explainTxnKey = (key) => {
    if (key === 'inputs') {
      return txn[key].map((input) => explainInput(input)) 
    } 
    else if (key === 'outputs') {
      return txn[key].map((output) => explainOutput(output))
    } else {
      const entry = txn[key];
      // return interpretedValue(entry)
      return <div>hmm</div>
    }

  }

  return (
    <div className="txn-explainer">
      { txn && Object.keys(txn).map((key, index) => {
          return (
            <div key={index} className="explainer-Row">
              {hexInput(key)}
              <div className="explainer-key">
                <span className="key-name">{nino(key) ? key : ''}</span>{interpretedValue(key)}
              </div>
              {/* <div>{ explainTxnKey(key) }</div> */}
            </div>
          )
        }
      )}
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