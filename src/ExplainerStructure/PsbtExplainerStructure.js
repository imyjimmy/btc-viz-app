import React, { forwardRef } from 'react';
import { MagicBytesExplainer } from './Psbt/MagicBytesExplainer';
import { GlobalMapsExplainer } from './Psbt/GlobalMapsExplainer';
import { InputMapsExplainer } from './Psbt/InputMapsExplainer';
import { OutputMapsExplainer } from './Psbt/OutputMapsExplainer';
import styles from './PsbtExplainerStructure.module.css';
/**
 * a PSBT (from spec):
 * <psbt> := <magic> <global-map> <input-map>* <output-map>*
 * <magic> := 0x70 0x73 0x62 0x74 0xFF
 * <global-map> := <keypair>* 0x00
 * <input-map> := <keypair>* 0x00
 * <output-map> := <keypair>* 0x00
 * <keypair> := <key> <value>
 * <key> := <keylen> <keytype> <keydata>
 * <value> := <valuelen> <valuedata>
 * 
 */

/* 
<div class="psbt-explainer">
  <div id="magic-explainer" class="magic-bytes-explainer"></div>
  <div id="global-maps-explainer" class="global-maps-explainer"></div>
  <div id="input-maps-explainer" class="input-maps-explainer"></div>
  <div id="output-maps-explainer" class="out-maps-explainer"></div>
</div>
*/

const PsbtExplainerStruct = forwardRef(({ json }, ref) => {
  
  const magic = json.magic ? <MagicBytesExplainer id={'magic-explainer'} json={json.magic} /> : <></>
  const globalMaps = json['global'] ? <GlobalMapsExplainer id={'global-maps-explainer'} json={json['global']} /> : <></>
  const inputMaps = json['input-maps'] ? <InputMapsExplainer id={'input-maps-explainer'} json={json['input-maps']} /> : <></>
  const outputMaps = json['output-maps'] ? <OutputMapsExplainer id={'output-maps-explainer'} json={json['output-maps']} /> : <></>

  return (
    <div ref={ref} className={styles["psbt-explainer"]}>
      {magic}
      {globalMaps}
      {inputMaps}
      {outputMaps}
    </div>
  )
});

export { PsbtExplainerStruct }