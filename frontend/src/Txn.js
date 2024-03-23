import React, { createRef, useState, useEffect, useLayoutEffect, useRef } from "react";
import { useResizeDetector } from 'react-resize-detector';
import { format, updateMatchers } from './syntaxHighlighter';
import "./Txn.css";

// calculates dimensions of code text box
// so we know when to introduce a newline
// const useRefDimensions = (ref) => {
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
//   React.useEffect(() => {
//     if (ref.current) {
//       console.log('ref.current:', ref)
//       const { current } = ref
//       const boundingRect = current.getBoundingClientRect()
//       console.log('bounding rect:', boundingRect)
//       // current.onresize = () => { console.log('resizedd')}
//       current.addEventListener('resize', () => {console.log('resizedd')})
//       const { width, height } = boundingRect
//       setDimensions({ width: Math.round(width), height: Math.round(height) })
//     }
//     console.log('heyyy')
//   }, [ref])
//   return dimensions
// }

// function useWindowSize(ref) {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     if (ref.current) {
//     ref.current.addEventListener('resize', updateSize);
//     }
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

const Txn = () => {
  const { width, height, highlightRef } = useResizeDetector();
  const [inputTxn, setInputTxn] = useState()
	const [parsedTxn, setParsedTxn] = useState({})
	const [matchers, setMatchers] = useState([])
  const [markupHtml, setMarkupHtml] = useState()
  const textareaRef = useRef();
	const codeRef = useRef();
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
    console.log('codeRef:', codeRef)
		codeRef.current.innerText = e.target.value
    format(codeRef.current.innerText, matchers, setMarkupHtml) // can highlight codeRef

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
        <pre id="highlighting" aria-hidden="true" ref={highlightRef}>{`${width}x${height}`}
          <code ref={codeRef} className="language-html" id="highlighting-content" dangerouslySetInnerHTML={markupFn(markupHtml)}>
          </code>
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
        {/* { console.log(width, height, highlightRef)} */}
        <div>Dimensions: {width}w {height}h</div>
      </div>
    </div>
  )
}

export { Txn }

{/*  */}
          {/* <span className="match-version">01000000</span>
          <span className="match-num_inputs">01</span>
          <span class="match-inputs-txid">c997a5e56e104102fa209c6a852dd90660a20b2d9c352423</span><br /><span className="match-inputs-txid">edce</span> */}