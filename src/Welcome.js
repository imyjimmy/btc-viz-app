import React from 'react';
import "./Welcome.css"
import { UpArrowIcon } from './UpArrowIcon';

const Welcome = ({}) => {

  return (
    <div className="welcome-message">
      <h2>Input a bitcoin transaction here <UpArrowIcon className="up-arrow" /></h2>
      
      <p>Here are some bitcoin transactions in the wild:</p>
      <ul>
        <li>Go to <a href="https://mempool.space/api/tx/e226ef849f03a08a9d8e15f949a1d47182fb5c46acf7158b78e6c011f6aba244/hex">this</a> site, select all &gt; copy. Then paste it up above. The way <a href="mempool.space">mempool.space</a> likes to visualize this transaction is <a href="https://mempool.space/tx/e226ef849f03a08a9d8e15f949a1d47182fb5c46acf7158b78e6c011f6aba244">here</a></li>
        <li>Here's one example of a <a href="https://mempool.space/api/tx/dc896171bc94c44dc0b775fdfe4f81b1137773d1e929ec40a3d05260f5d238da/hex">coinbase</a> transaction</li>
        <li>Here's a <a href="https://mempool.space/api/tx/695f958743c12ac8b3844d38afbe2d63479298fa31dabda11f0ac44040008b77/hex">multisig</a> transaction</li>
        <li>Example of an <a href="https://mempool.space/api/tx/0a9bb1113577002d5af01df3c345b60f8a1c2adcd41ba2f62c738dad15430790/hex">inscription</a> transaction</li>
      </ul>
    </div>
  )
}

export { Welcome }