import React, { useCallback, useState, useEffect, useRef } from "react";
import { TxnExplainer } from './TxnExplainer';
import { Welcome } from './Welcome';
import { useResizeDetector } from 'react-resize-detector';
import { format } from './syntaxHighlighter';
import { traverseJson, updateMatchers } from "./highlighter/psbtHighlighter";
import { SaveIcon } from './SaveIcon';

import "./Txn.css";

const PsbtTxn = ({currentTxn, inputTxn, saveTxn, setInputTxn}) => {
  const [txnName, setTxnName] = useState('')
	const [parsedTxn, setParsedTxn] = useState({})
	const [matchers, setMatchers] = useState([])
  const [markupHtml, setMarkupHtml] = useState()
  const textareaRef = useRef();
	const codeRef = useRef();

  const onResize = useCallback(() => {
    let resultArr = []
    let strArr = ['psbt']
    traverseJson(parsedTxn, '', resultArr, strArr)
    const matchers = updateMatchers(resultArr)
    let _matchers = []
    Object.assign(_matchers, matchers)
    format(codeRef.current.innerText, _matchers, setMarkupHtml)
  }, [parsedTxn]);

  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 200,
    onResize
  }); // ref: ref to <pre>

  const newLineRatio = 12;

  // btc txn name
  const changeTxnName = (e) => {
    setTxnName(e.target.value)
  }

  // cursor focus to texarea immediately
  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  /* Loads a Txn When Selected Txn from localstorage changes*/
  useEffect(() => {
    async function fetchData() {
      const resp = await conditionalFetch(inputTxn)
      if (resp !== undefined) {
        setParsedTxn(resp.data.psbt)
      }
    }
    if (inputTxn !== '' && inputTxn !== undefined) {
      setInputTxn(inputTxn)
      fetchData()
      codeRef.current.innerHTML = inputTxn
      let _matchers = []
      Object.assign(_matchers, matchers)
      // format(codeRef.current.innerText, _matchers, setMarkupHtml)
    }
  }, [currentTxn])

  const syncScroll = () => {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = ref.current;
    let codeRef_element = codeRef.current;
    // Get and set x and y
    if (textareaRef && textareaRef.current && textareaRef.current.scrollTop) {
      result_element.scrollTop = textareaRef.current.scrollTop;
      result_element.scrollLeft = textareaRef.current.scrollLeft;
    }
  }

	// source: https://www.freecodecamp.org/news/javascript-debounce-example/
	function debounce(func, timeout = 1000){
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	}

  /* Fetching and Parsing the input Txn 
  * - conditionalFetch
  * - fetchTxn
  * - useEffect dep on parsedTxn
  * - useEffect dep on markupHtml
  * 
  * conditionalFetch and fetchTxn are all about fetching when
  * input hex is an even number (1 byte == 2 hexes)
  * 
  */
	const conditionalFetch = async (inputTxn) => {
		return inputTxn && inputTxn.length % 2 === 0 ? await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BE_URL : ''}/psbt?txn=` + inputTxn, {
          method: 'GET',
          headers: { 'Authorization': `Token ${process.env.REACT_APP_PUBLIC_BE_TOKEN}`}
        }).then((resp) => { if (!resp.ok) { 
        // throw new Error(`HTTP Error: ${resp.status}`)
      } 
			return resp.json() 
		}) : ( inputTxn && inputTxn.length == 0 ? setParsedTxn({}) : (undefined))
	}

	const fetchTxn = async (e) => {
    if (e.target.selectionStart == e.target.selectionEnd && e.target.selectionStart !== 0) { // dont fire on text selection, address special case of highlighting all and delete text
      const resp = await conditionalFetch(inputTxn)
      if (resp !== undefined) {
        // let psbt = JSON.parse(resp.data.psbt)
        setParsedTxn(resp.data.psbt)
      }
    }
	}

  // Example JSON object
  const testObj = {
    'magic': { 
      'magic_bytes': { 'bytes': "b'psbt'", 'hex': '70736274', 'base64': 'cHNidA==' }, 
      'head_separator': { 'bytes': "b'\\xff'", 'hex': 'ff', 'base64': '/w==' }},
    'global': {
      "b'\\x00'": {
        "key": {
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
        "val": {
          "len": {
            "int": 117,
            "hex": "75",
            "base64": "dQ=="
          },
          "bytes": "b'\\x02\\x00\\x00\\x00\\x01&\\x81q7\\x1e\\xdf\\xf2\\x85\\xe97\\xad\\xee\\xa4\\xb3{x\\x00\\x0c\\x05f\\xcb\\xb3\\xaddd\\x17\\x13\\xcaB\\x17\\x1b\\xf6\\x00\\x00\\x00\\x00\\x00\\xfe\\xff\\xff\\xff\\x02\\xd3\\xdf\\xf5\\x05\\x00\\x00\\x00\\x00\\x19v\\xa9\\x14\\xd0\\xc5\\x99\\x03\\xc5\\xba\\xc2\\x86\\x87`\\xe9\\x0f\\xd5!\\xa4fZ\\xa7e \\x88\\xac\\x00\\xe1\\xf5\\x05\\x00\\x00\\x00\\x00\\x17\\xa9\\x145E\\xe6\\xe3;\\x83,G\\x05\\x0f$\\xd3\\xee\\xb9<\\x9c\\x03\\x94\\x8b\\xc7\\x87\\xb3.\\x13\\x00'",
          "hex": "0200000001268171371edff285e937adeea4b37b78000c0566cbb3ad64641713ca42171bf60000000000feffffff02d3dff505000000001976a914d0c59903c5bac2868760e90fd521a4665aa7652088ac00e1f5050000000017a9143545e6e33b832c47050f24d3eeb93c9c03948bc787b32e1300",
          "base64": "AgAAAAEmgXE3Ht/yhek3re6ks3t4AAwFZsuzrWRkFxPKQhcb9gAAAAAA/v///wLT3/UFAAAAABl2qRTQxZkDxbrChodg6Q/VIaRmWqdlIIisAOH1BQAAAAAXqRQ1RebjO4MsRwUPJNPuuTycA5SLx4ezLhMA"
        }
      }
    }
    // 'input': {},
    // 'output': {}
  }

  useEffect(() => {
    // console.log('parsedTxn changed, updating matchers')
    let resultArr = []
    let strArr = ['psbt']
    traverseJson(parsedTxn, '', resultArr, strArr)
    console.log('after traversing json: ', resultArr, strArr)
    let _matchers = updateMatchers(resultArr)
		// let _matchers = updateMatchers(parsedTxn, 'psbt');
    if (_matchers.length > 0) { 
      let matchers = [];
      Object.assign(matchers, _matchers) // _matchers will eventually be consumed to 0 in format function
      setMatchers(matchers);
      // console.log('calling format from parsedTxn change. matchers: ', matchers)
      format(codeRef.current.innerText, _matchers, setMarkupHtml)
    }
    
	}, [parsedTxn])

  useEffect(() => {
    codeRef.current.innerHTML = markupFn(markupHtml, 1)
    syncScroll()
  }, [markupHtml])

  /* Composing the HTML 
  *   the following section has fn's related to composing the parsed HTML 
  *   correctly in a way that contains syntax highlighting
  */

  const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)]

  /* jesus 🤦‍♂️ */
  const composeHtml = (outputHtmlArr) => {
    var toReturn = ''
    toReturn = outputHtmlArr.reduce((resp, entry, index) => {
      if ( entry.element === 'br' ) {
        resp += '<br \\>';
      }
      else { 
        if (entry.text) {
          resp += '<'+ entry.element + ' class="' + entry.className + '">' + entry.text + '</' + entry.element + '>'
        } else {
          resp += ''
        }
      }
      return resp;
    }, '')

    return toReturn
  }

  /* annotates text in <code> area with highlighted colors, breaks <br /> if needed */
  const markupFn = (outputHtml, flag) => {
    
    let maxChars = Math.floor(width / newLineRatio); // width - total padding
    if (width % newLineRatio < 1) { maxChars -= 1 } // edge case bug

    var chars = 0;
    if (outputHtml) {
      for (var i = 0; i < outputHtml.length; i++) {
        var entry = outputHtml[i]
        if (entry.element !== 'br') {
          chars += entry.text.length;
        } else {
          chars = 0;
        }
        if (chars > maxChars) {
          const split = splitAt(entry.text.length - (chars - maxChars), entry.text);
          // eslint-disable-next-line
          const twoEntries = split.map((e) => { return { element: entry['element'], className: entry['className'], text: e }});
          outputHtml.splice(i, 1, twoEntries[0], { element: 'br', className: '', text: ''}, twoEntries[1])
          chars = 0;
        }
      }
    }
    var result = ''
    if (outputHtml) {
      result = composeHtml(outputHtml)
    }

    if (flag === 1) {
      return result
    }

    return { __html: result }
  }

  /* Change Handler */
  const changeInput = (e) => {
		e.preventDefault()
		setInputTxn(e.target.value)

    if (e.target.value === '') {
      setParsedTxn({})
    }

    ref.current.scrollTop = textareaRef.current.scrollTop
    /* problematic-- innertext gets completely replaced by e.target.value including the syntax highlighting */
		codeRef.current.innerHTML = e.target.value
    
    // codeRef.current.scrollTop = textareaRef.current.scrollTop;
    // console.log('codearea scrolltop:', codeRef)
    console.log('changeInput, formatting: ', codeRef.current.innerText, matchers)
    let _matchers = []
    Object.assign(_matchers, matchers)
    // format(codeRef.current.innerText, _matchers, setMarkupHtml) // can highlight codeRef
	}

  return (
    <div className="txn-column">
      <div className="txn-input">
        <label htmlFor="txn">psbt:</label><input type="text" placeholder={'untitled'} value={txnName} onChange={changeTxnName}/>
        {txnName ? (<button className="saveButton" onClick={(e) => saveTxn(txnName,inputTxn)}><SaveIcon className="saveIcon"/></button>):(<></>)}
        <textarea 
          id="editor" 
          name="txn"
          ref={textareaRef}
          onChange={changeInput}
          onKeyUp={debounce((e) => {fetchTxn(e)})}
          onScroll={syncScroll}
          value={inputTxn}
          cols="20" 
          rows="12"
        />
        <pre id="highlighting" aria-hidden="true" ref={ref}>
          <code key="code-element" ref={codeRef} className="language-html"
          id="highlighting-content" 
          >
          </code>
        </pre>
      </div>
      {/* <TxnExplainer txn={parsedTxn}/> */}
    </div>
  )
}

export { PsbtTxn }