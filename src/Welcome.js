import React, { useState } from 'react';
import "./Welcome.css";
import { UpArrowIcon } from './UpArrowIcon';
import { CopyIcon } from './CopyIcon';
import { copyToClipboard } from './utils/copyToClipboard';

const Welcome = ({}) => {
  const example = '01000000000101ea76fb6b9b97e1856110ad73d5b2df0d7c2ea0dda460ce02bd9996ae894b3fdc0000000000ffffffff02da8706000000000017a91401d997ebb7a0a6fbb11ade2656370e5ab169ad888739f3050000000000160014f19d552e7a71e77b0554fdc20b51d8119ce2984902483045022100f44f7d2f9e4cd332a8acb5cf8a84ac9ddf156686013de4d2ed29a5478011d79c022003190e0be7145e364813926420b1851a0eef7b34256d8b95a36516b7aa67dcd7012103170023b110c257e8ae1bca2d568323538ad31ac6b494fd3eac4c7b4b410e496400000000';

  const coinbase = '010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff6403bcd00c2cfabe6d6df267d1c8e75624050aacfeb2cb405575c45b7a5c7c7f923ffdb47fb105a8b2cc10000000f09f909f092f4632506f6f6c2f640000000000000000000000000000000000000000000000000000000000000000000000050000438e0a010000000622020000000000001976a914c6740a12d0a7d556f89782bf5faf0e12cf25a63988ac15a0d328000000001976a914c85526a428126c00ad071b56341a5a553a5e96a388ac0000000000000000266a24aa21a9edf6b6f3aa7efcd2549f8aea8828ff110c707acf9f0ef84adc2fdf7b4bc3948ed600000000000000002f6a2d434f524501a21cbd3caa4fe89bccd1d716c92ce4533e4d4733e7ec323813c943336c579e238228a8ebd096a7e50000000000000000266a2448617468438b516bfd19e2e48f01933f0a3fa9db4f6229fd8f26eabe50bb2b5939b3d2ee00000000000000002c6a4c2952534b424c4f434b3a5e676d0a4577bbfb343cabbaf4e5cfd8ab442db48647469351884921005fa842012000000000000000000000000000000000000000000000000000000000000000002dc5e13f';

  const multisig = '010000000001019d91f618229daa824d095ba0add64da93ab91bf3a32f7317e405398a689e56bf0100000000ffffffff02fd340700000000001600148b94868da33c24042dfb8ced5c54ef16af5496b357f371010000000022002041e21222becb40dac9bcd3092960116f6ecd1ee19b841db254892b5830acc7a80400473044022064c5249b9041abe46f81d6d977788d929ba0a834f55c189820fa46ebe249ad5d02207fa6f055ad2660e877e4617cf97a6bc59718585cfa449549c87ccf33e2d48a1d014730440220272522d1496a161f2fb28b92383135d779af1d4322b8f187a135b2aca7f6e90802203f65e8c7cb496d29a0204246655c503c67c8e6d495d305f8f51451f8a3013f710147522103e3ab4fee9dd471f66d75d68addcb75ce8e9ba9183c7fc334d8064ae7e87e3b8a2103a3af0f49a21d29106ebeef9b3c3d69fc375c856a7153d97156a5b7a161ca6c2552ae00000000';

  const inscription = '0200000000010153f23de8accf28fe6973595302849de2c1f99b71dbd776cb93966ae6edba69290100000000fdffffff0122020000000000002251205fdeb4480e9ed6b767b825dc1f3cd5b79adf7a9e6b36e2ac1f3afec0163783c903400b8d6119f466e55768fd09d7984b7dcfdaaf1ef55d5ece10207a170ad2f260ac1acb73ced49e76b6a1ff7c5d653cc3cb914c33254d5e39d3a01c4357b3ca1dc0dd20c69a73e7127b2d1e68585a5b96a38f3ce65d65211e40f64ac9e93066275e4e73ac0063036f7264010118746578742f706c61696e3b636861727365743d7574662d38004c967b2270223a224252432d313030222c226f70223a226275726e33222c227469636b223a22627263313030222c22616d74223a22313030222c22636f70223a227377222c22746f223a22626f733a6c705f6272633130305f626f73222c22657874223a7b22616f6d223a22363833392e303031313434393633333032353931333233222c22646c223a2231373136353130323034227d7d6821c1c69a73e7127b2d1e68585a5b96a38f3ce65d65211e40f64ac9e93066275e4e7300000000';

  return (
    <div className="welcome-message">
      <h2>Paste a bitcoin transaction here <UpArrowIcon className="up-arrow" /></h2>
      <h3>For Example, copy the entire transaction below & paste it into the text box</h3>
      <div className="example-hex explainer-val">
        <code>
          {example}
        </code>
        <br />
        <button onClick={(e) => copyToClipboard(example)}><CopyIcon className="copy-icon"/></button>
      </div>
      <h3>More Example Transactions</h3>
      <ul>
        <li>
          <div className="text">
            Here's one example of a <a href="https://mempool.space/api/tx/dc896171bc94c44dc0b775fdfe4f81b1137773d1e929ec40a3d05260f5d238da/hex">coinbase</a> transaction:
          </div>
        <div className="example-hex explainer-val">
          <code>
          {coinbase}
          </code>
          <br />
        <button onClick={(e) => copyToClipboard(coinbase)}><CopyIcon className="copy-icon"/></button>
      </div>
        </li>
        <li>
          <div className="text">
            Here's a <a href="https://mempool.space/api/tx/695f958743c12ac8b3844d38afbe2d63479298fa31dabda11f0ac44040008b77/hex">multisig</a> transaction:
          </div>
          <div className="example-hex explainer-val">
            <code>
            {multisig}
            </code>
            <br />
          <button onClick={(e) => copyToClipboard(multisig)}><CopyIcon className="copy-icon"/></button>
          </div>
        </li>
        <li><div className="text">Example of an <a href="https://mempool.space/api/tx/0a9bb1113577002d5af01df3c345b60f8a1c2adcd41ba2f62c738dad15430790/hex">inscription</a> transaction:</div>
          <div className="example-hex explainer-val">
            <code>
              {inscription}
            </code>
            <br />
            <button onClick={(e) => copyToClipboard(inscription)}><CopyIcon className="copy-icon"/></button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export { Welcome }