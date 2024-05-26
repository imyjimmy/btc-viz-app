import React, { forwardRef } from 'react';
import { MagicExplainer } from './MagicExplainer';
import { GlobalMapsExplainer } from './GlobalMapsExplainer';
import { InputMapsExplainer } from './InputMapsExplainer';
import { OutputMapsExplainer } from './OutputMapsExplainer';
import './PsbtExplainerStructure.css';
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
 */

const PsbtExplainerStruct = forwardRef(({ json }, ref) => {
  
  const magic = json.magic ? <MagicExplainer id={'magic-explainer'} json={json.magic} /> : <></>
  const globalMaps = json['global'] ? <GlobalMapsExplainer id={'global-maps-explainer'} json={json['global']} /> : <></>
  const inputMaps = json['input-maps'] ? <InputMapsExplainer id={'input-maps-explainer'} json={json['input-maps']} /> : <></>
  const outputMaps = json['output-maps'] ? <OutputMapsExplainer id={'output-maps-explainer'} json={json['output-maps']} /> : <></>

  return (
    <div ref={ref} className="psbt-explainer">
      {magic}
      {globalMaps}
      {inputMaps}
      {outputMaps}
    </div>
  )
});

export { PsbtExplainerStruct }