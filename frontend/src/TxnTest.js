import React, { useCallback, useState, useEffect, useRef } from "react";
import { TxnExplainer } from './TxnExplainer';
import { useResizeDetector } from 'react-resize-detector';
import { format, updateMatchers } from './syntaxHighlighter';
import { SaveIcon } from './SaveIcon';

import "./Txn.css";

const Txn = ({currentTxn, inputTxn, saveTxn, setInputTxn}) => {
  const [txnName, setTxnName] = useState('')
	const [parsedTxn, setParsedTxn] = useState({})
	const [matchers, setMatchers] = useState([])
  const [markupHtml, setMarkupHtml] = useState()
  const textareaRef = useRef();
	// const codeRef = useRef();

  const onResize = useCallback(() => {
    const matchers = updateMatchers(parsedTxn);
    // format(codeRef.current.innerText, matchers, setMarkupHtml)
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
        setParsedTxn(resp.data.tx)
      }
    }
    if (inputTxn !== '' && inputTxn !== undefined) {
      setInputTxn(inputTxn)
      fetchData()
      // codeRef.current.innerHTML = inputTxn
      // format(codeRef.current.innerText, matchers, setMarkupHtml)
    }
  }, [currentTxn])

  const changeInput = (e) => {
		e.preventDefault()
		setInputTxn(e.target.value)

    if (e.target.value === '') {
      setParsedTxn({})
    }

    ref.current.scrollTop = textareaRef.current.scrollTop
		// codeRef.current.innerHTML = e.target.value
    
    // codeRef.current.scrollTop = textareaRef.current.scrollTop;
    // console.log('codearea scrolltop:', codeRef)
    // format(codeRef.current.innerText, matchers, setMarkupHtml) // can highlight codeRef
	}

  const syncScroll = () => {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = ref.current;
    // let codeRef_element = codeRef.current;
    // Get and set x and y
    if (textareaRef && textareaRef.current && textareaRef.current.scrollTop) {
      result_element.scrollTop = textareaRef.current.scrollTop;
      result_element.scrollLeft = textareaRef.current.scrollLeft;
      console.log(result_element.scrollTop, textareaRef.current.scrollTop, ref)
    }

    // if (codeRef && codeRef.current) {
    //   result_element.scrollTop = codeRef.current.scrollTop;
    //   result_element.scrollLeft = codeRef.current.scrollLeft;
    // }
  }

	// source: https://www.freecodecamp.org/news/javascript-debounce-example/
	function debounce(func, timeout = 1000){
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	}

	const conditionalFetch = async (inputTxn) => {
		return inputTxn && inputTxn.length % 2 === 0 ? await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BE_URL : ''}/data?txn=` + inputTxn, {
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
        setParsedTxn(resp.data.tx)
      }
    }
	}

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
  const markupFn = (outputHtml) => {
    
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

    return { __html: result }
  }

	useEffect(() => {
		const matchers = updateMatchers(parsedTxn);
    if (matchers.length > 0) { 
      setMatchers(matchers);
      // console.log('calling format from parsedTxn change. matchers: ', matchers)
      // format(codeRef.current.innerText, matchers, setMarkupHtml)
    }
	}, [parsedTxn])

  return (
    <div className="txn-column">
      <div className="txn-input">
        <label htmlFor="txn">bitcoin transaction:</label><input type="text" placeholder={'untitled'} value={txnName} onChange={changeTxnName}/>
        {txnName ? (<button className="saveButton" onClick={(e) => saveTxn(txnName,inputTxn)}><SaveIcon className="saveIcon"/></button>):(<></>)}
        <textarea 
          id="editor" 
          name="txn"
          ref={textareaRef}
          onChange={(e) => { changeInput(e); syncScroll();}}
          onKeyUp={debounce((e) => {fetchTxn(e)})}
          onScroll={syncScroll}
          value={inputTxn}
          cols="20" 
          rows="12"
        />
        <pre id="highlighting" aria-hidden="true" ref={ref}>
          <code className="language-html" id="highlighting-content">
          </code>
        </pre>
      </div>
    </div>
  )
}

export { Txn }