import React, { createRef, useState, useEffect, useLayoutEffect, useRef } from "react";
import { TxnExplainer } from './TxnExplainer';
import { useResizeDetector } from 'react-resize-detector';
import { format, updateMatchers } from './syntaxHighlighter';
import "./Txn.css";


/*
 700 / 58 ~= 12 
  floor (700 / 12 = 58

  612 / 49 = 12.5 

  floor (612 / 12)
*/

const Txn = () => {
  const { width, height, ref } = useResizeDetector(); // ref to <pre>
  const [inputTxn, setInputTxn] = useState()
	const [parsedTxn, setParsedTxn] = useState({})
	const [matchers, setMatchers] = useState([])
  const [markupHtml, setMarkupHtml] = useState()
  const textareaRef = useRef();
	const codeRef = useRef();

  const newLineRatio = 12;
  // const highlightRef = useRef()
  // const dimensions = useRefDimensions(highlightRef)
  // const [width, height] = useWindowSize(highlightRef);

  // cursor focus to texarea immediately
  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const changeInput = (e) => {
		e.preventDefault()
		setInputTxn(e.target.value)
		codeRef.current.innerHTML = e.target.value
    syncScroll()
    format(codeRef.current.innerText, matchers, setMarkupHtml) // can highlight codeRef
	}

  const syncScroll = () => {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = ref.current;
    // Get and set x and y
    if (textareaRef && textareaRef.current) {
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

	const conditionalFetch = async () => {
		return inputTxn && inputTxn.length % 2 === 0 ? await fetch(
      `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BE_URL : ''}/data?txn=` + inputTxn).then((resp) => { if (!resp.ok) { 
        // throw new Error(`HTTP Error: ${resp.status}`)
      } 
			return resp.json() 
		}) : (undefined)
	}

	const fetchTxn = async () => {
		const resp = await conditionalFetch()
		if (resp !== undefined) {
			setParsedTxn(resp.data.tx)
		}
	}

  const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)]

  /* jesus 🤦‍♂️ */
  const composeHtml = (outputHtmlArr) => {
    var toReturn = ''
    toReturn = outputHtmlArr.reduce((resp, entry, index) => {
      if ( entry.element === 'br' ) {
        resp += '<br \>';
      }
      else { 
        if (entry.text) {
          resp += '<'+ entry.element + ' ' + 'class="' + entry.className + '">' + entry.text + '</' + entry.element + '>'
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
    const maxChars = Math.floor((width-4) / newLineRatio); // width - total padding
    var chars = 0;
    if (outputHtml) {
      for (var i = 0; i < outputHtml.length; i++) {
        var entry = outputHtml[i]
        console.log('entry: ', entry)
        if (entry.element !== 'br') {
          chars += entry.text.length;
        } else {
          chars = 0;
        }
        if (chars > maxChars) {
          const twoEntries = splitAt(entry.text.length - (chars - maxChars), entry.text).map((e) => { return { element: entry['element'], className: entry['className'], text: e }} )
          outputHtml.splice(i, 1, twoEntries[0], { element: 'br', className: '', text: ''}, twoEntries[1])
          chars = 0;
        }
      }
    }
    var result = ''
    if (outputHtml) {
      result = composeHtml(outputHtml)
      console.log('composed: ', result);
    }

    return { __html: result }
  }

	useEffect(() => {
		const matchers = updateMatchers(parsedTxn);
		// console.log('matchers: ', matchers);
    if (matchers.length > 0) { 
      setMatchers(matchers);
      console.log('calling format from parsedTxn change. matchers: ', matchers)
      format(codeRef.current.innerText, matchers, setMarkupHtml)
    }
	}, [parsedTxn])

  return (
    <div className="txn-column">
      <div className="txn-input">
        <label htmlFor="txn">bitcoin transaction</label>
        <textarea 
          id="editor" 
          name="txn"
          ref={textareaRef}
          onChange={changeInput} 
          onKeyUp={debounce(() => fetchTxn())}
          onScroll={syncScroll}
          cols="20" 
          rows="12"
        />
        <pre id="highlighting" aria-hidden="true" ref={ref}>
          <code ref={codeRef} className="language-html" id="highlighting-content" dangerouslySetInnerHTML={markupFn(markupHtml)}>
          </code>
        </pre>
      </div>
      <TxnExplainer txn={parsedTxn}/>
    </div>
  )
}

export { Txn }