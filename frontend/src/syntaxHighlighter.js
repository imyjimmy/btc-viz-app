
const addMatcher = (matchers, txn, base, key) => {
  if (txn[key] && txn[key]['hex'] !== '') {
    matchers.push({ 
      key: base ? base + '-' + key : key, 
      match: new RegExp(txn[key]['hex']),
      className: base ? `match-${base}-${key}` : `match-${key}`,
      // style,
      // className,
    })
  }
}

export const updateMatchers = (txn) => {
  const matchers = []
  Object.keys(txn).map((key) => {
    console.log(key)
    if (key === 'inputs' || key === 'outputs') {
      const inOrOutArray = txn[key]
      //  [{txid: {…}, vout: {…}, script_sig: {…}, sequence: {…}}]
      inOrOutArray.map((k) => {
        // addMatcher(matchers, inOrOutArray[k], k)
        // console.log(k)
        Object.keys(k).map(innerKey => {
          if (innerKey !== 'witness') { // handle witness later
            addMatcher(matchers, k, key, innerKey)
          } else { // witness
            const witnessArr = k[innerKey]
            witnessArr.map((witness, index) => {
              addMatcher(matchers, witnessArr, 'witness', index)
            })
            // Object.keys(k[innerKey]).map((witness, index) => 
            //   addMatcher(matchers, witness, 'witness', index)
            // )
          }
        })
      })
    } else {
      addMatcher(matchers, txn, '', key)
    }
  })

  return matchers
}

export const format = (inputText, matchers, callback) => {
  console.log('format: ', inputText, matchers, callback)
  var sanitizedInputText = inputText.replace(/\n/g,'');
  var outputHtmlArr = [];

  while(sanitizedInputText.length) {
    var nextMatch = null;
    var nextClassName = null;
    var matchedIndex = -1;

    for (var i = 0; i < matchers.length; i++) {
      const match = matchers[i].match.exec(sanitizedInputText);
      if (match && (nextMatch == null || match.index < nextMatch.index)) {
        nextMatch = match;
        // nextStyle = matchers[i].style;
        nextClassName = matchers[i].className;
        matchedIndex = i;
      }
    }

    if (nextMatch) {
      var token = sanitizedInputText.substring(0, nextMatch.index).replace(/\ /g, '');
      if (token.length > 0) { 
        console.log('token: ', token);
        outputHtmlArr.push({ element: 'span', className: '', text: token})
      }
      var matchText = nextMatch[0];
      outputHtmlArr.push({ element: 'span', className: nextClassName, text: matchText.replace(/\ /g, '')});
      sanitizedInputText = sanitizedInputText.substring(nextMatch.index + matchText.length);
      // matchers.shift();
      matchers.splice(matchedIndex, 1);
    } else {
      outputHtmlArr.push({ element: 'span', className: '', text: sanitizedInputText.replace(/\ /g, '')});
      sanitizedInputText = "";
    }
  }
  console.log('outputHtmlArr:', outputHtmlArr)
  callback(outputHtmlArr)
}