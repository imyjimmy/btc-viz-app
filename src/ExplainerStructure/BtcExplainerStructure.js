import React, { forwardRef } from 'react';
import { VersionExplainer } from './Btc/VersionExplainer';
import { SegwitExplainer } from './Btc/SegwitExplainer';
import { InputsExplainer } from './Btc/InputsExplainer';
import { OutputsExplainer } from './Btc/OutputsExplainer';

import styles from './PsbtExplainerStructure.module.css';

const BtcExplainerStruct = forwardRef(({ json }, ref) => {
  
  // const magic = json.magic ? <MagicBytesExplainer id={'magic-explainer'} json={json.magic} /> : <></>
  // const globalMaps = json['global'] ? <GlobalMapsExplainer id={'global-maps-explainer'} json={json['global']} /> : <></>
  // const inputMaps = json['input-maps'] ? <InputMapsExplainer id={'input-maps-explainer'} json={json['input-maps']} /> : <></>
  // const outputMaps = json['output-maps'] ? <OutputMapsExplainer id={'output-maps-explainer'} json={json['output-maps']} /> : <></>
	const version = json.version ? <VersionExplainer id={'version-explainer'} json={json.version}/> : <></>
	const segwit = json.segwit ? <SegwitExplainer id={'segwit-explainer'} json={json.segwit}/> : <></>
	const inputs = json.inputs ? <InputsExplainer id={'inputs-explainer'} json={json.inputs}/> : <></>
	const outputs = json.outputs ? <OutputsExplainer id={'outputs-explainer'} json={json.outputs}/> : <></>
	// const locktime

  return (
    <div ref={ref} className={styles["psbt-explainer"]}>
      { console.log('json: ', json)}
			{version}
			{segwit}
			{inputs}
			{outputs}
    </div>
  )
});

export { BtcExplainerStruct }