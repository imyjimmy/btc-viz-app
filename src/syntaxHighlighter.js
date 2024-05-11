
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
  if (txn[key] && txn[key]['length']) {
    matchers.push({
      key: base ? base + '-' + key + '-length' : key + '-length',
      match: new RegExp(txn[key]['length']),
      className: base ? `match-${base}-${key}-length` : `match-${key}-length`
    })
  }
}

export const updateMatchers = (txn) => {
  const matchers = []
  Object.keys(txn).map((key) => {
    if (key === 'inputs' || key === 'outputs') {
      const inOrOutArray = txn[key]
      //  [{txid: {…}, vout: {…}, script_sig: {…}, sequence: {…}}]
      inOrOutArray.map((k) => {
        Object.keys(k).map(innerKey => { // map over keys within an entry that exists in either input or output array
          if (innerKey !== 'witness') { // handle witness later
            addMatcher(matchers, k, key, innerKey)
          } else { // witness
            const witnessArr = k[innerKey] // [{length: 'xx', str: 'abc', hex: '16ae'}, ...]
            console.log(witnessArr, k, innerKey)
            witnessArr.map((witnessEntry, index) => { // {length: 'xx', str: 'abc', hex: '16ae'}
              addMatcher(matchers, witnessArr, 'witness', index)
            })
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
  console.log('format:', matchers);
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
  callback(outputHtmlArr)
}