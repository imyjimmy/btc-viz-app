
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
  const matchers = [];
  console.log('updating matchers:', matchers)
  Object.keys(txn).map((key) => {
    console.log(key)
    if (key === 'inputs' || key === 'outputs') {
      const inOrOutArray = txn[key]
      //  [{txid: {…}, vout: {…}, script_sig: {…}, sequence: {…}}]
      inOrOutArray.map((k) => {
        // addMatcher(matchers, inOrOutArray[k], k)
        // console.log(k)
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

export const format = (inputText, matchers, callback) => {
  console.log('format: ', inputText, matchers, callback);

  var outputHtml = '';

  while(inputText.length) {
    var nextMatch = null;
    var nextClassName = null;

    for (var i = 0; i < matchers.length; i++) {
      const match = matchers[i].match.exec(inputText);
      if (match && (nextMatch == null || match.index < nextMatch.index)) {
        nextMatch = match;
        // nextStyle = matchers[i].style;
        nextClassName = matchers[i].className;
      }
    }

    if (nextMatch) {
      outputHtml += inputText.substring(0, nextMatch.index).replace(/\ /g, '&nbsp;');
      var matchText = nextMatch[0];
      
      outputHtml += '<span class="' + nextClassName + '">' + matchText.replace(/\ /g, '&nbsp;') + '</span>';
      inputText = inputText.substring(nextMatch.index + matchText.length);
    } else {
      outputHtml += inputText.replace(/\ /g, '&nbsp;');
      inputText = "";
    }
  }

  callback(outputHtml)
}