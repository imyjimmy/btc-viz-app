
const addMatcher = (matchers, txn, base, key) => {
  matchers.push({ 
    key: base ? base + '-' + key : key, 
    match: new RegExp(txn[key]['hex']),
    // style,
    // className,
  })
}

export const updateMatchers = (txn) => {
  console.log('updating matchers')
  const matchers = [];
  Object.keys(txn).map((key) => {
    console.log(key)
    if (key === 'inputs' || key === 'outputs') {
      const inOrOutArray = txn[key]
      console.log('key: ', key, '\ninOrOutArray: ', inOrOutArray)
      //  [{txid: {…}, vout: {…}, script_sig: {…}, sequence: {…}}]
      inOrOutArray.map((k) => {
        // addMatcher(matchers, inOrOutArray[k], k)
        console.log(k)
        Object.keys(k).map(innerKey => {
          addMatcher(matchers, k, key, innerKey)
        })
      })
    } else {
      addMatcher(matchers, txn, '', key)
    }
  })

  return matchers
}