import React, { useState, useEffect, useRef } from "react";
import { format, updateMatchers } from './syntaxHighlighter';
import "./Txn.css";

const Txn = () => {
  const [inputTxn, setInputTxn] = useState()
	const [parsedTxn, setParsedTxn] = useState({})
	const [matchers, setMatchers] = useState([])
  const [markupHtml, setMarkupHtml] = useState()
  const textareaRef = useRef();
	const codeRef = useRef();

  // cursor focus to texarea immediately
  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const changeInput = (e) => {
		e.preventDefault()
		setInputTxn(e.target.value)
    console.log('codeRef:', codeRef)
		codeRef.current.innerText = e.target.value
    format(codeRef.current.innerText, matchers, setMarkupHtml)
		// can highlight codeRef
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
		return inputTxn && inputTxn.length % 2 === 0 ? await fetch("/data?txn=" + inputTxn).then((resp) => { if (!resp.ok) 
			{ throw new Error(`HTTP Error: ${resp.status}`)} 
			return resp.json() 
		}) : (undefined)
	}

	const fetchTxn = async () => {
		const resp = await conditionalFetch()
		// console.log('resp:', resp)
		if (resp !== undefined) {
			setParsedTxn(resp.data.tx)
		}
	}

  const markupFn = (outputHtml) => {
    return { __html: outputHtml }
  }

	useEffect(() => {
		const matchers = updateMatchers(parsedTxn);
		console.log('matchers: ', matchers);
    if (matchers.length > 0) { 
      setMatchers(matchers);
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
          cols="20" 
          rows="8"
        />
        <pre id="highlighting" aria-hidden="true">
          <code ref={codeRef} className="language-html" id="highlighting-content" dangerouslySetInnerHTML={markupFn(markupHtml)}></code>
        </pre>
      </div>
      <div className="txn-explainer">
        {/* <h5>Breakdown</h5> */}
        {/* { console.log('parsedTxn: ', parsedTxn)}				 */}
        { parsedTxn && Object.keys(parsedTxn).map((key, index) => {
            return (
              <div key={index}>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export { Txn }