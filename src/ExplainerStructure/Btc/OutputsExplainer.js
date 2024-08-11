/* 
"outputs": [
  {
    "num": 2,
    "hex": "02"
  },
  {
    "amount": {
      "int": 427994,
      "hex": "da87060000000000"
    },
    "scriptPubKey": {
      "length": {
        "int": 23,
        "hex": "17"
      },
      "1": {
        "op_code": 169,
        "bytes": "b'\\xa9'",
        "hex": "a9"
      },
      "2": {
        "data": {
          "length": {
            "bytes": "b'\\x14'",
            "int": 20,
            "hex": "14",
            "user-input-length": 20
          },
          "bytes": "b'\\x01\\xd9\\x97\\xeb\\xb7\\xa0\\xa6\\xfb\\xb1\\x1a\\xde&V7\\x0eZ\\xb1i\\xad\\x88'",
          "hex": "01d997ebb7a0a6fbb11ade2656370e5ab169ad88"
        }
      },
      "23": {
        "op_code": 135,
        "bytes": "b'\\x87'",
        "hex": "87"
      },
      "summary": "OP_HASH160 01d997ebb7a0a6fbb11ade2656370e5ab169ad88 OP_EQUAL"
    }
  },
  {
    "amount": {
      "int": 389945,
      "hex": "39f3050000000000"
    },
    "scriptPubKey": {
      "length": {
        "int": 22,
        "hex": "16"
      },
      "1": {
        "op_code": 0,
        "bytes": "b'\\x00'",
        "hex": "00"
      },
      "2": {
        "data": {
          "length": {
            "bytes": "b'\\x14'",
            "int": 20,
            "hex": "14",
            "user-input-length": 20
          },
          "bytes": "b'\\xf1\\x9dU.zq\\xe7{\\x05T\\xfd\\xc2\\x0bQ\\xd8\\x11\\x9c\\xe2\\x98I'",
          "hex": "f19d552e7a71e77b0554fdc20b51d8119ce29849"
        }
      },
      "summary": "OP_0 f19d552e7a71e77b0554fdc20b51d8119ce29849"
    }
  }
],

*/
const OutputsExplainer = ({ id, json }) => {
	return (<div>Outputs Explainer</div>)
}

export { OutputsExplainer }