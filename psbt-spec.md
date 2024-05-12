==Specification==

source: https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki

The Partially Signed Bitcoin Transaction (PSBT) format consists of key-value maps.
Each map consists of a sequence of key-value records, terminated by a <tt>0x00</tt> byte <ref>'''Why
is the separator here <tt>0x00</tt> instead of <tt>0xff</tt>?'''
The separator here is used to distinguish between each chunk of data. A separator of 0x00 would mean that
the unserializer can read it as a key length of 0, which would never occur with actual keys. It can thus
be used as a separator and allow for easier unserializer implementation.</ref>.


 <psbt> := <magic> <global-map> <input-map>* <output-map>*
 <magic> := 0x70 0x73 0x62 0x74 0xFF
 <global-map> := <keypair>* 0x00
 <input-map> := <keypair>* 0x00
 <output-map> := <keypair>* 0x00
 <keypair> := <key> <value>
 <key> := <keylen> <keytype> <keydata>
 <value> := <valuelen> <valuedata>

Where:

;<tt><keytype></tt>
: A [https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer compact size] unsigned integer representing the type. This compact size unsigned integer must be minimally encoded, i.e. if the value can be represented using one byte, it must be represented as one byte. There can be multiple entries with the same <tt><keytype></tt> within a specific <tt><map></tt>, but the <tt><key></tt> must be unique.
;<tt><keylen></tt>
: The compact size unsigned integer containing the combined length of <tt><keytype></tt> and <tt><keydata></tt>
;<tt><valuelen></tt>
: The compact size unsigned integer containing the length of <tt><valuedata></tt>.
;<tt><magic></tt>
: Magic bytes which are ASCII for psbt <ref>'''Why use 4 bytes for psbt?''' The
transaction format needed to start with a 5 byte header which uniquely identifies
it. The first bytes were chosen to be the ASCII for psbt because that stands for
Partially Signed Bitcoin Transaction. </ref> followed by a separator of <tt>0xFF</tt><ref>'''Why Use a separator after the magic bytes?''' The separator
is part of the 5 byte header for PSBT. This byte is a separator of <tt>0xff</tt> because
this will cause any non-PSBT unserializer to fail to properly unserialize the PSBT
as a normal transaction. Likewise, since the 5 byte header is fixed, no transaction
in the non-PSBT format will be able to be unserialized by a PSBT unserializer.</ref>. This integer must be serialized in most significant byte order.

The currently defined global types are as follows:

{|
! Name
! <tt><keytype></tt>
! <tt><keydata></tt>
! <tt><keydata></tt> Description
! <tt><valuedata></tt>
! <tt><valuedata></tt> Description
! Versions Requiring Inclusion
! Versions Requiring Exclusion
! Versions Allowing Inclusion
! Parent BIP
|-
| Unsigned Transaction
| <tt>PSBT_GLOBAL_UNSIGNED_TX = 0x00</tt>
| None
| No key data
| <tt><bytes transaction></tt>
| The transaction in network serialization. The scriptSigs and witnesses for each input must be empty. The transaction must be in the old serialization format (without witnesses).
| 0
| 2
| 0
| 174
|-
| Extended Public Key
| <tt>PSBT_GLOBAL_XPUB = 0x01</tt>
| <tt><bytes xpub></tt>
| The 78 byte serialized extended public key as defined by BIP 32. Extended public keys are those that can be used to derive public keys used in the inputs and outputs of this transaction. It should be the public key at the highest hardened derivation index so that the unhardened child keys used in the transaction can be derived.
| <tt><4 byte fingerprint> <32-bit little endian uint path element>*</tt>
| The master key fingerprint as defined by BIP 32 concatenated with the derivation path of the public key. The derivation path is represented as 32-bit little endian unsigned integer indexes concatenated with each other. The number of 32 bit unsigned integer indexes must match the depth provided in the extended public key.
|
|
| 0, 2
| 174
|-
| Transaction Version
| <tt>PSBT_GLOBAL_TX_VERSION = 0x02</tt>
| None
| No key data
| <tt><32-bit little endian int version></tt>
| The 32-bit little endian signed integer representing the version number of the transaction being created. Note that this is not the same as the PSBT version number specified by the PSBT_GLOBAL_VERSION field.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Fallback Locktime
| <tt>PSBT_GLOBAL_FALLBACK_LOCKTIME = 0x03</tt>
| None
| No key data
| <tt><32-bit little endian uint locktime></tt>
| The 32-bit little endian unsigned integer representing the transaction locktime to use if no inputs specify a required locktime.
|
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Input Count
| <tt>PSBT_GLOBAL_INPUT_COUNT = 0x04</tt>
| None
| No key data
| <tt><compact size uint input count></tt>
| Compact size unsigned integer representing the number of inputs in this PSBT.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Output Count
| <tt>PSBT_GLOBAL_OUTPUT_COUNT = 0x05</tt>
| None
| No key data
| <tt><compact size uint input count></tt>
| Compact size unsigned integer representing the number of outputs in this PSBT.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Transaction Modifiable Flags
| <tt>PSBT_GLOBAL_TX_MODIFIABLE = 0x06</tt>
| None
| No key data
| <tt><8-bit uint flags></tt>
| An 8 bit little endian unsigned integer as a bitfield for various transaction modification flags. Bit 0 is the Inputs Modifiable Flag and indicates whether inputs can be modified. Bit 1 is the Outputs Modifiable Flag and indicates whether outputs can be modified. Bit 2 is the Has SIGHASH_SINGLE flag and indicates whether the transaction has a SIGHASH_SINGLE signature who's input and output pairing must be preserved. Bit 2 essentially indicates that the Constructor must iterate the inputs to determine whether and how to add an input.
|
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| PSBT Version Number
| <tt>PSBT_GLOBAL_VERSION = 0xFB</tt>
| None
| No key data
| <tt><32-bit little endian uint version></tt>
| The 32-bit little endian unsigned integer representing the version number of this PSBT. If omitted, the version number is 0.
|
|
| 0, 2
| 174
|-
| Proprietary Use Type
| <tt>PSBT_GLOBAL_PROPRIETARY = 0xFC</tt>
| <tt><compact size uint identifier length> <bytes identifier> <compact size uint subtype> <bytes subkeydata></tt>
| Compact size unsigned integer of the length of the identifier, followed by identifier prefix, followed by a compact size unsigned integer subtype, followed by the key data itself.
| <tt><bytes data></tt>
| Any value data as defined by the proprietary type user.
|
|
| 0, 2
| 174
|}

The currently defined per-input types are defined as follows:

{|
! Name
! <tt><keytype></tt>
! <tt><keydata></tt>
! <tt><keydata></tt> Description
! <tt><valuedata></tt>
! <tt><valuedata></tt> Description
! Versions Requiring Inclusion
! Versions Requiring Exclusion
! Versions Allowing Inclusion
! Parent BIP
|-
| Non-Witness UTXO
| <tt>PSBT_IN_NON_WITNESS_UTXO = 0x00</tt>
| None
| No key data
| <tt><bytes transaction></tt>
| The transaction in network serialization format the current input spends from. This should be present for inputs that spend non-segwit outputs and can be present for inputs that spend segwit outputs. An input can have both <tt>PSBT_IN_NON_WITNESS_UTXO</tt> and <tt>PSBT_IN_WITNESS_UTXO</tt>. <ref>'''Why can both UTXO types be provided?''' Many wallets began requiring the full previous transaction (i.e. <tt>PSBT_IN_NON_WITNESS_UTXO</tt>) for segwit inputs when PSBT was already in use. In order to be compatible with software which were expecting <tt>PSBT_IN_WITNESS_UTXO</tt>, both UTXO types must be allowed.</ref>
|
|
| 0, 2
| 174
|-
| Witness UTXO
| <tt>PSBT_IN_WITNESS_UTXO = 0x01</tt>
| None
| No key data
| <tt><64-bit little endian int amount> <compact size uint scriptPubKeylen> <bytes scriptPubKey></tt>
| The entire transaction output in network serialization which the current input spends from. This should only be present for inputs which spend segwit outputs, including P2SH embedded ones. An input can have both <tt>PSBT_IN_NON_WITNESS_UTXO</tt> and <tt>PSBT_IN_WITNESS_UTXO</tt>
|
|
| 0, 2
| 174
|-
| Partial Signature
| <tt>PSBT_IN_PARTIAL_SIG = 0x02</tt>
| <tt><bytes pubkey></tt>
| The public key which corresponds to this signature.
| <tt><bytes signature></tt>
| The signature as would be pushed to the stack from a scriptSig or witness. The signature should be a valid ECDSA signature corresponding to the pubkey that would return true when verified and not a value that would return false or be invalid otherwise (such as a NULLDUMMY).
|
|
| 0, 2
| 174
|-
| Sighash Type
| <tt>PSBT_IN_SIGHASH_TYPE = 0x03</tt>
| None
| No key data
| <tt><32-bit little endian uint sighash type></tt>
| The 32-bit unsigned integer specifying the sighash type to be used for this input. Signatures for this input must use the sighash type, finalizers must fail to finalize inputs which have signatures that do not match the specified sighash type. Signers who cannot produce signatures with the sighash type must not provide a signature.
|
|
| 0, 2
| 174
|-
| Redeem Script
| <tt>PSBT_IN_REDEEM_SCRIPT = 0x04</tt>
| None
| No key data
| <tt><bytes redeemScript></tt>
| The redeemScript for this input if it has one.
|
|
| 0, 2
| 174
|-
| Witness Script
| <tt>PSBT_IN_WITNESS_SCRIPT = 0x05</tt>
| None
| No key data
| <tt><bytes witnessScript></tt>
| The witnessScript for this input if it has one.
|
|
| 0, 2
| 174
|-
| BIP 32 Derivation Path
| <tt>PSBT_IN_BIP32_DERIVATION = 0x06</tt>
| <tt><bytes pubkey></tt>
| The public key
| <tt><4 byte fingerprint> <32-bit little endian uint path element>*</tt>
| The master key fingerprint as defined by BIP 32 concatenated with the derivation path of the public key. The derivation path is represented as 32 bit unsigned integer indexes concatenated with each other. Public keys are those that will be needed to sign this input.
|
|
| 0, 2
| 174
|-
| Finalized scriptSig
| <tt>PSBT_IN_FINAL_SCRIPTSIG = 0x07</tt>
| None
| No key data
| <tt><bytes scriptSig></tt>
| The Finalized scriptSig contains a fully constructed scriptSig with signatures and any other scripts necessary for the input to pass validation.
|
|
| 0, 2
| 174
|-
| Finalized scriptWitness
| <tt>PSBT_IN_FINAL_SCRIPTWITNESS = 0x08</tt>
| None
| No key data
| <tt><bytes scriptWitness></tt>
| The Finalized scriptWitness contains a fully constructed scriptWitness with signatures and any other scripts necessary for the input to pass validation.
|
|
| 0, 2
| 174
|-
| Proof-of-reserves commitment
| <tt>PSBT_IN_POR_COMMITMENT = 0x09</tt>
| None
| No key data
| <tt><bytes porCommitment></tt>
| The UTF-8 encoded commitment message string for the proof-of-reserves.  See [[bip-0127.mediawiki|BIP 127]] for more information.
|
|
| 0, 2
| [[bip-0127.mediawiki|127]]
|-
| RIPEMD160 preimage
| <tt>PSBT_IN_RIPEMD160 = 0x0a</tt>
| <tt><20-byte hash></tt>
| The resulting hash of the preimage
| <tt><bytes preimage></tt>
| The hash preimage, encoded as a byte vector, which must equal the key when run through the <tt>RIPEMD160</tt> algorithm
|
|
| 0, 2
| 174
|-
| SHA256 preimage
| <tt>PSBT_IN_SHA256 = 0x0b</tt>
| <tt><32-byte hash></tt>
| The resulting hash of the preimage
| <tt><bytes preimage></tt>
| The hash preimage, encoded as a byte vector, which must equal the key when run through the <tt>SHA256</tt> algorithm
|
|
| 0, 2
| 174
|-
| HASH160 preimage
| <tt>PSBT_IN_HASH160 = 0x0c</tt>
| <tt><20-byte hash></tt>
| The resulting hash of the preimage
| <tt><bytes preimage></tt>
| The hash preimage, encoded as a byte vector, which must equal the key when run through the <tt>SHA256</tt> algorithm followed by the <tt>RIPEMD160</tt> algorithm
|
|
| 0, 2
| 174
|-
| HASH256 preimage
| <tt>PSBT_IN_HASH256 = 0x0d</tt>
| <tt><32-byte hash></tt>
| The resulting hash of the preimage
| <tt><bytes preimage></tt>
| The hash preimage, encoded as a byte vector, which must equal the key when run through the <tt>SHA256</tt> algorithm twice
|
|
| 0, 2
| 174
|-
| Previous TXID
| <tt>PSBT_IN_PREVIOUS_TXID = 0x0e</tt>
| None
| No key data
| <tt><32 byte txid></tt>
| 32 byte txid of the previous transaction whose output at PSBT_IN_OUTPUT_INDEX is being spent.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Spent Output Index
| <tt>PSBT_IN_OUTPUT_INDEX = 0x0f</tt>
| None
| No key data
| <tt><32-bit little endian uint index></tt>
| 32 bit little endian integer representing the index of the output being spent in the transaction with the txid of PSBT_IN_PREVIOUS_TXID.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Sequence Number
| <tt>PSBT_IN_SEQUENCE = 0x10</tt>
| None
| No key data
| <tt><32-bit little endian uint sequence></tt>
| The 32 bit unsigned little endian integer for the sequence number of this input. If omitted, the sequence number is assumed to be the final sequence number (0xffffffff).
|
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Required Time-based Locktime
| <tt>PSBT_IN_REQUIRED_TIME_LOCKTIME = 0x11</tt>
| None
| No key data
| <tt><32-bit little endian uint locktime></tt>
| 32 bit unsigned little endian integer greater than or equal to 500000000 representing the minimum Unix timestamp that this input requires to be set as the transaction's lock time.
|
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Required Height-based Locktime
| <tt>PSBT_IN_REQUIRED_HEIGHT_LOCKTIME = 0x12</tt>
| None
| No key data
| <tt><32-bit uint locktime></tt>
| 32 bit unsigned little endian integer less than 500000000 representing the minimum block height that this input requires to be set as the transaction's lock time.
|
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Taproot Key Spend Signature
| <tt>PSBT_IN_TAP_KEY_SIG = 0x13</tt>
| None
| No key data
| <tt><64 or 65 byte signature></tt>
| The 64 or 65 byte Schnorr signature for key path spending a Taproot output. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Script Spend Signature
| <tt>PSBT_IN_TAP_SCRIPT_SIG = 0x14</tt>
| <tt><32 byte xonlypubkey> <leafhash></tt>
| A 32 byte X-only public key involved in a leaf script concatenated with the 32 byte hash of the leaf it is part of.
| <tt><64 or 65 byte signature></tt>
| The 64 or 65 byte Schnorr signature for this pubkey and leaf combination. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Leaf Script
| <tt>PSBT_IN_TAP_LEAF_SCRIPT = 0x15</tt>
| <tt><bytes control block></tt>
| The control block for this leaf as specified in BIP 341. The control block contains the merkle tree path to this leaf.
| <tt><bytes script> <8-bit uint leaf version></tt>
| The script for this leaf as would be provided in the witness stack followed by the single byte leaf version. Note that the leaves included in this field should be those that the signers of this input are expected to be able to sign for. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Key BIP 32 Derivation Path
| <tt>PSBT_IN_TAP_BIP32_DERIVATION = 0x16</tt>
| <tt><32 byte xonlypubkey></tt>
| A 32 byte X-only public key involved in this input. It may be the output key, the internal key, or a key present in a leaf script.
| <tt><compact size uint number of hashes> <32 byte leaf hash>* <4 byte fingerprint> <32-bit little endian uint path element>*</tt>
| A compact size unsigned integer representing the number of leaf hashes, followed by a list of leaf hashes, followed by the 4 byte master key fingerprint concatenated with the derivation path of the public key. The derivation path is represented as 32-bit little endian unsigned integer indexes concatenated with each other. Public keys are those needed to spend this output. The leaf hashes are of the leaves which involve this public key. The internal key does not have leaf hashes, so can be indicated with a <tt>hashes len</tt> of 0. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Internal Key
| <tt>PSBT_IN_TAP_INTERNAL_KEY = 0x17</tt>
| None
| No key data
| <tt><32 byte xonlypubkey></tt>
| The X-only pubkey used as the internal key in this output. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Merkle Root
| <tt>PSBT_IN_TAP_MERKLE_ROOT = 0x18</tt>
| None
| No key data
| <tt><32-byte hash></tt>
| The 32 byte Merkle root hash. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Proprietary Use Type
| <tt>PSBT_IN_PROPRIETARY = 0xFC</tt>
| <tt><compact size uint identifier length> <bytes identifier> <compact size uint subtype> <bytes subkeydata></tt>
| Compact size unsigned integer of the length of the identifier, followed by identifier prefix, followed by a compact size unsigned integer subtype, followed by the key data itself.
| <tt><bytes data></tt>
| Any value data as defined by the proprietary type user.
|
|
| 0, 2
| 174
|}

The currently defined per-output <ref>'''Why do we need per-output data?''' Per-output data allows signers
to verify that the outputs are going to the intended recipient. The output data can also be use by signers to
determine which outputs are change outputs and verify that the change is returning to the correct place.</ref> types are defined as follows:

{|
! Name
! <tt><keytype></tt>
! <tt><keydata></tt>
! <tt><keydata></tt> Description
! <tt><valuedata></tt>
! <tt><valuedata></tt> Description
! Versions Requiring Inclusion
! Versions Requiring Exclusion
! Versions Allowing Inclusion
! Parent BIP
|-
| Redeem Script
| <tt>PSBT_OUT_REDEEM_SCRIPT = 0x00</tt>
| None
| No key data
| <tt><bytes redeemScript></tt>
| The redeemScript for this output if it has one.
|
|
| 0, 2
| 174
|-
| Witness Script
| <tt>PSBT_OUT_WITNESS_SCRIPT = 0x01</tt>
| None
| No key data
| <tt><bytes witnessScript></tt>
| The witnessScript for this output if it has one.
|
|
| 0, 2
| 174
|-
| BIP 32 Derivation Path
| <tt>PSBT_OUT_BIP32_DERIVATION = 0x02</tt>
| <tt><bytes public key></tt>
| The public key
| <tt><4 byte fingerprint> <32-bit little endian uint path element>*</tt>
| The master key fingerprint concatenated with the derivation path of the public key. The derivation path is represented as 32-bit little endian unsigned integer indexes concatenated with each other. Public keys are those needed to spend this output.
|
|
| 0, 2
| 174
|-
| Output Amount
| <tt>PSBT_OUT_AMOUNT = 0x03</tt>
| None
| No key data
| <tt><64-bit int amount></tt>
| 64 bit signed little endian integer representing the output's amount in satoshis.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Output Script
| <tt>PSBT_OUT_SCRIPT = 0x04</tt>
| None
| No key data
| <tt><bytes script></tt>
| The script for this output, also known as the scriptPubKey. Must be omitted in PSBTv0. Must be provided in PSBTv2.
| 2
| 0
| 2
| [[bip-0370.mediawiki|370]]
|-
| Taproot Internal Key
| <tt>PSBT_OUT_TAP_INTERNAL_KEY = 0x05</tt>
| None
| No key data
| <tt><32 byte xonlypubkey></tt>
| The X-only pubkey used as the internal key in this output.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Tree
| <tt>PSBT_OUT_TAP_TREE = 0x06</tt>
| None
| No key data
| <tt>{<8-bit uint depth> <8-bit uint leaf version> <compact size uint scriptlen> <bytes script>}*</tt>
| One or more tuples representing the depth, leaf version, and script for a leaf in the Taproot tree, allowing the entire tree to be reconstructed. The tuples must be in depth first search order so that the tree is correctly reconstructed. Each tuple is an 8-bit unsigned integer representing the depth in the Taproot tree for this script, an 8-bit unsigned integer representing the leaf version, the length of the script as a compact size unsigned integer, and the script itself.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Taproot Key BIP 32 Derivation Path
| <tt>PSBT_OUT_TAP_BIP32_DERIVATION = 0x07</tt>
| <tt><32 byte xonlypubkey></tt>
| A 32 byte X-only public key involved in this output. It may be the output key, the internal key, or a key present in a leaf script.
| <tt><compact size uint number of hashes> <32 byte leaf hash>* <4 byte fingerprint> <32-bit little endian uint path element>*</tt>
| A compact size unsigned integer representing the number of leaf hashes, followed by a list of leaf hashes, followed by the 4 byte master key fingerprint concatenated with the derivation path of the public key. The derivation path is represented as 32-bit little endian unsigned integer indexes concatenated with each other. Public keys are those needed to spend this output. The leaf hashes are of the leaves which involve this public key. The internal key does not have leaf hashes, so can be indicated with a <tt>hashes len</tt> of 0. Finalizers should remove this field after <tt>PSBT_IN_FINAL_SCRIPTWITNESS</tt> is constructed.
|
|
| 0, 2
| [[bip-0371.mediawiki|371]]
|-
| Proprietary Use Type
| <tt>PSBT_OUT_PROPRIETARY = 0xFC</tt>
| <tt><compact size uint identifier length> <bytes identifier> <compact size uint subtype> <bytes subkeydata></tt>
| Compact size unsigned integer of the length of the identifier, followed by identifier prefix, followed by a compact size unsigned integer subtype, followed by the key data itself.
| <tt><bytes data></tt>
| Any value data as defined by the proprietary type user.
|
|
| 0, 2
| 174
|}

Types can be skipped when they are unnecessary. For example, if an input is a witness
input, then it should not have a Non-Witness UTXO key-value pair.

If the signer encounters key-value pairs that it does not understand, it must
pass those key-value pairs through when re-serializing the transaction.

All keys must have the data that they specify. If any key or value does not match the
specified format for that type, the PSBT must be considered invalid. For example, any
key that has no data except for the type specifier must only have the type specifier in
the key.
