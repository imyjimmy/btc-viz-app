
/* 
  matchers: Matchers[]
  entry: { hex: '...'}
  strArr: string[]
*/
const addMatcher = (matchers, entry) => {
  matchers.push({
    match: new RegExp(entry['hex']),
    className: entry['className']
  });
}

/* */
export const updateMatchers = (entries) => {
  const matchers = []
  let target = ['hex', 'className']
  // make sure every entry has these keys
  console.log('entries: ', entries)
  entries.filter((e) => target.every((k) => Object.keys(e).includes(k))).map((entry) => addMatcher(matchers, entry))
  return matchers;
}

function isNestedEntry(obj) {
  // Iterate over the keys of the object
  for (let key in obj) {
      // Check if the value corresponding to the key is an object
      if (typeof obj[key] === 'object') {
          // If any value is an obj, return true
          return true;
      }
  }
  // If all values are not objects, return false
  return false;
}

/*
  base case -- found an entry that does not contain further objects
    example: 
    {
      "int": 1,
      "hex": "01",
      "base64": "AQ=="
    },

  iterative case 
    example: 
    "key": 
      {
        "len": {
          "int": 1,
          "hex": "01",
          "base64": "AQ=="
        },
        "bytes": "b'\\x00'",
        "type": "b'\\x00'",
        "val": "b''",
        "hex": "00",
        "base64": "AA=="
      },
*/

      /* 
        problem: btc inputs structure doesnt work
        "inputs": [
        {
          "num": 1,
          "hex": "01"
        },
        {
          "txid": {
            "str": "",
            "hex": "",
            "bytes": "b''"
          },
          "vout": {
            "num": 0,
            "hex": "",
            "bytes": "b''"
          },
          "script_sig": {
            "length": {
              "int": 0,
              "hex": "0"
            }
          },
          "sequence": {
            "byte": "b''",
            "hex": ""
          },
          "witness": [
            {
              "num": 0,
              "hex": "0"
            }
          ]
        }
      ],

      whereas it does work on a psbt:
       "input-maps": {
        "0": {
          "b'\\x00'": {
            "key": {
              "len": {
                "int": 1,
                "bytes": "b'\\x01'",
                "hex": "01",
                "base64": "AQ=="
              },
              "type": "b'\\x00'",
              "data": "b''",
              "bytes": "b'\\x00'",
              "hex": "00",
              "base64": "AA=="
            },
            "val": {
              "len": {
                "int": 421,
                "bytes": "b'\\xfd\\xa5\\x01'",
                "hex": "fda501",
                "base64": "/aUB"
              },
              "bytes": "b'\\x01\\x00\\x00\\x00\\x00\\x01\\x02\\x89\\xa3\\xc7\\x1e\\xabM \\xe07\\x1b\\xbb\\xa4\\xcci\\x8f\\xa2\\x95\\xc9F:\\xfa.9\\x7f\\x853\\xcc\\xb6/\\x95g\\xe5\\x01\\x00\\x00\\x00\\x17\\x16\\x00\\x14\\xbe\\x18\\xd1R\\xa9\\xb0\\x12\\x03\\x9d\\xaf=\\xa7\\xdeOS4\\x9e\\xec\\xb9\\x85\\xff\\xff\\xff\\xff\\x86\\xf8\\xaaC\\xa7\\x1d\\xff\\x14H\\x89:S\\nr7\\xefkF\\x08\\xbb\\xb2\\xdd-\\x01q\\xe6:\\xecjH\\x90\\xb4\\x01\\x00\\x00\\x00\\x17\\x16\\x00\\x14\\xfe>\\x9e\\xf1\\xa7E\\xe9t\\xd9\\x02\\xc45YC\\xab\\xcb4\\xbdSS\\xff\\xff\\xff\\xff\\x02\\x00\\xc2\\xeb\\x0b\\x00\\x00\\x00\\x00\\x19v\\xa9\\x14\\x85\\xcf\\xf1\\t\\x7f\\xd9\\xe0\\x08\\xbb4\\xafp\\x9cb\\x19{8\\x97\\x8aH\\x88\\xacr\\xfe\\xf8N,\\x00\\x00\\x00\\x17\\xa9\\x143\\x97%\\xba!\\xef\\xd6*\\xc7S\\xa9\\xbc\\xd0g\\xd6\\xc7\\xa6\\xa3\\x9d\\x05\\x87\\x02G0D\\x02 \\'\\x12\\xbe\"\\xe0\\'\\x0f9OV\\x83\\x11\\xdc|\\xa9\\xa6\\x89p\\xb8\\x02_\\xdd;$\\x02)\\xf0\\x7f\\x8a_:$\\x02 \\x01\\x8b8\\xd7\\xdc\\xd3\\x14\\xe74\\xc9\\'k\\xd6\\xfb@\\xf6s2[\\xc4\\xba\\xa1D\\xc8\\x00\\xd2\\xf2\\xf0-\\xb2v\\\\\\x01!\\x03\\xd2\\xe1Vt\\x94\\x1b\\xadJ\\x99cr\\xcb\\x87\\xe1\\x85m6R`m\\x98V/\\xe3\\x9c^\\x9e~A?!\\x05\\x02H0E\\x02!\\x00\\xd1+\\x85-\\x85\\xdc\\xd9a\\xd2\\xf5\\xf4\\xabf\\x06T\\xdfn\\xed\\xccyL\\x0c3\\xce\\\\\\xc3\\t\\xff\\xb5\\xfc\\xe5\\x8d\\x02 g3\\x8a\\x8e\\x0e\\x17%\\xc1\\x97\\xfb\\x1a\\x88\\xafY\\xf5\\x1eD\\xe4%[ \\x16|\\x86\\x84\\x03\\x1c\\x05\\xd1\\xf2Y*\\x01!\\x02#\\xb7+\\xee\\xf0\\x96]\\x10\\xbe\\x07x\\xef\\xec\\xd6\\x1f\\xca\\xc6\\xf7\\x9aN\\xa1i93\\x80sDd\\xf8O*\\xb3\\x00\\x00\\x00\\x00'",
              "hex": "0100000000010289a3c71eab4d20e0371bbba4cc698fa295c9463afa2e397f8533ccb62f9567e50100000017160014be18d152a9b012039daf3da7de4f53349eecb985ffffffff86f8aa43a71dff1448893a530a7237ef6b4608bbb2dd2d0171e63aec6a4890b40100000017160014fe3e9ef1a745e974d902c4355943abcb34bd5353ffffffff0200c2eb0b000000001976a91485cff1097fd9e008bb34af709c62197b38978a4888ac72fef84e2c00000017a914339725ba21efd62ac753a9bcd067d6c7a6a39d05870247304402202712be22e0270f394f568311dc7ca9a68970b8025fdd3b240229f07f8a5f3a240220018b38d7dcd314e734c9276bd6fb40f673325bc4baa144c800d2f2f02db2765c012103d2e15674941bad4a996372cb87e1856d3652606d98562fe39c5e9e7e413f210502483045022100d12b852d85dcd961d2f5f4ab660654df6eedcc794c0c33ce5cc309ffb5fce58d022067338a8e0e1725c197fb1a88af59f51e44e4255b20167c8684031c05d1f2592a01210223b72beef0965d10be0778efecd61fcac6f79a4ea169393380734464f84f2ab300000000",
              "base64": "AQAAAAABAomjxx6rTSDgNxu7pMxpj6KVyUY6+i45f4UzzLYvlWflAQAAABcWABS+GNFSqbASA52vPafeT1M0nuy5hf////+G+KpDpx3/FEiJOlMKcjfva0YIu7LdLQFx5jrsakiQtAEAAAAXFgAU/j6e8adF6XTZAsQ1WUOryzS9U1P/////AgDC6wsAAAAAGXapFIXP8Ql/2eAIuzSvcJxiGXs4l4pIiKxy/vhOLAAAABepFDOXJboh79Yqx1OpvNBn1semo50FhwJHMEQCICcSviLgJw85T1aDEdx8qaaJcLgCX907JAIp8H+KXzokAiABizjX3NMU5zTJJ2vW+0D2czJbxLqhRMgA0vLwLbJ2XAEhA9LhVnSUG61KmWNyy4fhhW02UmBtmFYv45xenn5BPyEFAkgwRQIhANErhS2F3Nlh0vX0q2YGVN9u7cx5TAwzzlzDCf+1/OWNAiBnM4qODhclwZf7GoivWfUeROQlWyAWfIaEAxwF0fJZKgEhAiO3K+7wll0Qvgd47+zWH8rG95pOoWk5M4BzRGT4TyqzAAAAAA=="
            }
          },
          "separator": {
            "bytes": "b'\\x00'",
            "hex": "00",
            "base64": "b'AA=='"
          }
        }
      },
      */

const traverseJson = (json, currKey, resultArr, strArr) => {
  if (!isNestedEntry(json)) {
    resultArr.push({...json, 'key': currKey, 'className': strArr.filter((entries) => entries && !entries.startsWith("b'\\")).join('-') + (json.hasOwnProperty('num') ? `-num` : '')})
    return
  } else {
    let objKeys = Object.keys(json).filter((k) => typeof json[k] === 'object' && json[k] !== null && !Array.isArray(json))
    let arrayKeys = Object.keys(json).filter((k) => Array.isArray(json) && !objKeys.includes(k));
    let nonObjKeys = Object.keys(json).filter((k) => !objKeys.includes(k) && !arrayKeys.includes(k)); // string keys
    if (nonObjKeys.length > 0) {
      let filteredObj = nonObjKeys.reduce((filteredObject, key) => { 
        filteredObject[key] = json[key];
        return filteredObject;
      }, {});
      resultArr.push({...filteredObj, 'key': currKey, 'className': strArr.filter((entries) => entries && !entries.startsWith("b'\\")).join('-') })
    }

    let nonStringKeys = [...objKeys, ...arrayKeys]

    for (let i in nonStringKeys) {
      let key = nonStringKeys[i]
      if (!key.startsWith("b'\\") && !key.startsWith("b\"\\") && !/^\d/.test(key)) {
        strArr.push(key)
      } else if ((key.startsWith("b'\\") || key.startsWith("b\"\\")) && json[key] && json[key]['key']) { // we are pushing a key--try to get its type and push that instead
        let type = json[key]['key']['type']
        if (type) { strArr.push('type-' + type) }
      } else if (/^\d/.test(key)) { // key starts w a number, is an index
        strArr.push('') // this makes the pop fn easier to deal with
      } else {
        console.log('yooo!!!!') // shouldnt get here lol
      }
      
      traverseJson(json[key], key, resultArr, strArr);
      strArr.pop()
    }
  }
}

export { traverseJson }