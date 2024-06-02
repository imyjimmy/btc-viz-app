import React from 'react';
import "./Welcome.css"
import { UpArrowIcon } from './UpArrowIcon';

const Welcome = ({}) => {

  return (
    <div className="welcome-message">
      <h2>Input a bitcoin transaction here <UpArrowIcon className="up-arrow" /></h2>
      <h3>How to use this site</h3>
      {/* <p>Find a bitcoin transaction hex by going to any of the popular bitcoin blockchain explorers, copy and paste it into the textbox above.</p> */}
      <ul className="how-to">
        <li>Find a bitcoin transaction hex by going to any of the popular bitcoin blockchain explorers.</li>
        <li>Select the entire hex, Copy and Paste it into the textbox above.</li>
        <li>
          For example, <a href="https://mempool.space/tx/e226ef849f03a08a9d8e15f949a1d47182fb5c46acf7158b78e6c011f6aba244">here's</a> a bitcoin transaction as presented by <a href="https://mempool.space">mempool.space</a>. The raw hex of the transaction is below:
          <div className="example-hex explainer-val">
            <code>
            01000000000101ea76fb6b9b97e1856110ad73d5b2df0d7c2ea0dda460ce02bd9996ae894b3fdc0000000000ffffffff02da8706000000000017a91401d997ebb7a0a6fbb11ade2656370e5ab169ad888739f3050000000000160014f19d552e7a71e77b0554fdc20b51d8119ce2984902483045022100f44f7d2f9e4cd332a8acb5cf8a84ac9ddf156686013de4d2ed29a5478011d79c022003190e0be7145e364813926420b1851a0eef7b34256d8b95a36516b7aa67dcd7012103170023b110c257e8ae1bca2d568323538ad31ac6b494fd3eac4c7b4b410e496400000000
            </code>
          </div>
          <div>Copy and Paste the above into the textbox! You can also find the raw hex by clicking on "Transaction hex" of the transaction page or go to <a href="https://mempool.space/api/tx/e226ef849f03a08a9d8e15f949a1d47182fb5c46acf7158b78e6c011f6aba244/hex">this page</a>.</div>
        </li>
        <li>Wait a moment for the parser to do its thing 🚀</li>
      </ul>
      <p>Here are some bitcoin transactions in the wild:</p>
      <ul>
        {/* <li>Go to <a href="https://mempool.space/api/tx/e226ef849f03a08a9d8e15f949a1d47182fb5c46acf7158b78e6c011f6aba244/hex">this</a> site, select all &gt; copy. Then paste it up above. The way <a href="mempool.space">mempool.space</a> likes to visualize this transaction is <a href="https://mempool.space/tx/e226ef849f03a08a9d8e15f949a1d47182fb5c46acf7158b78e6c011f6aba244">here</a></li> */}
        <li>Here's one example of a <a href="https://mempool.space/api/tx/dc896171bc94c44dc0b775fdfe4f81b1137773d1e929ec40a3d05260f5d238da/hex">coinbase</a> transaction</li>
        <li>Here's a <a href="https://mempool.space/api/tx/695f958743c12ac8b3844d38afbe2d63479298fa31dabda11f0ac44040008b77/hex">multisig</a> transaction</li>
        <li>Example of an <a href="https://mempool.space/api/tx/0a9bb1113577002d5af01df3c345b60f8a1c2adcd41ba2f62c738dad15430790/hex">inscription</a> transaction</li>
      </ul>
    </div>
  )
}

export { Welcome }