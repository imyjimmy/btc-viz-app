
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
const traverseJson = (json, currKey, resultArr, strArr) => {
  if (!isNestedEntry(json)) {
    resultArr.push({...json, 'key': currKey, 'className': strArr.join('-')})
    return
  } else {
    let objKeys = Object.keys(json).filter((k) => typeof json[k] === 'object' && json[k] !== null)
    
    let nonObjKeys = Object.keys(json).filter((k) => !objKeys.includes(k))
    if (nonObjKeys.length > 0) {
      let filteredObj = nonObjKeys.reduce((filteredObject, key) => { 
        filteredObject[key] = json[key];
        return filteredObject;
      }, {});
      resultArr.push({...filteredObj, 'key': currKey, 'className': strArr.join('-') })
    }

    for (let i in objKeys) {
      let key = objKeys[i]
      strArr.push(key)
      traverseJson(json[key], key, resultArr, strArr);
      strArr.pop()
    }
  }
}

export { traverseJson }