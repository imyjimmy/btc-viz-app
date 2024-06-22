import React, { useCallback, useState, useEffect, useRef } from "react";
// import { TxnExplainer } from './TxnExplainer';
// import { Welcome } from './Welcome';
import { useResizeDetector } from 'react-resize-detector';

import { format } from './syntaxHighlighter';
import { traverseJson, updateMatchers } from "./highlighter/psbtHighlighter";
import { SaveIcon } from './SaveIcon';

import './Txn.css';
import './Psbt.scss';
import { PsbtExplainerStruct } from "./ExplainerStructure/PsbtExplainerStructure";

import { getClassNameAtPosition, findAncestorWithIdAndToggleClass, updateExpandCollapsedDivs } from './utils/explainerUtils';

  /* Click Outside Detection for textareaRef*/
  const useOutsideClick = (callback) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);
  
    return ref;
  };

  /* */
  const handleClickOutside = () => {
    
  };
  
const PsbtTxn = ({currentTxn, inputTxn, saveTxn, setInputTxn, psbtParam}) => {
  const [txnName, setTxnName] = useState('')
	const [parsedTxn, setParsedTxn] = useState({})
	const [matchers, setMatchers] = useState([])
  const [markupHtml, setMarkupHtml] = useState()
  const textareaRef = useOutsideClick(handleClickOutside); //useRef();
	
	// textarea width info trying to address the stupid text offset bug
	const [info, setInfo] = useState({ lines: 0, charsPerLine: 0 });

	const calculateTextareaInfo = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const text = textarea.value;

      // Count the number of lines
      const lines = text.split('\n').length;
			console.log('lines: ', text.split('\n'));
      // Fixed character width for Source Code Pro at 15pt
      const charWidth = 12; // Approximate width of a character in Source Code Pro at 15pt

      // Get the computed style to account for padding
      const style = window.getComputedStyle(textarea);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight = parseFloat(style.paddingRight);

      // Calculate the effective width
      const textareaWidth = textarea.clientWidth - paddingLeft - paddingRight;
      const charsPerLine = Math.floor(textareaWidth / charWidth)-1;
      
      setInfo({ lines, charsPerLine });
    }
  };

  const codeRef = useRef();
  const explainerRef = useRef();

  const onResize = useCallback(() => {
		const textarea = textareaRef.current;
		if (textarea) {
      calculateTextareaInfo(); 
		}
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

  /* Cursor and Scroll things */
  // cursor focus to texarea immediately
  useEffect(() => {
		const textarea = textareaRef.current;
		textarea.focus()
		if (textarea) {
      calculateTextareaInfo(); // Initial calculation

      // // Add event listeners
      // const handleChange = () => calculateTextareaInfo();
      // textarea.addEventListener('input', handleChange);
      // textarea.addEventListener('resize', handleChange);

      // // Cleanup event listeners on unmount
      // return () => {
      //   textarea.removeEventListener('input', handleChange);
      //   textarea.removeEventListener('resize', handleChange);
      // };
    }
  }, [])

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

  // useEffect(() => {
  //   // document.addEventListener('selectstart', onSelectStart);
  //   // document.addEventListener('mouseup', onSelectEnd);
  //   // return () => {
  //   //   document.removeEventListener('selectstart', onSelectStart);
  //   //   document.removeEventListener('mouseup', onSelectEnd);
  //   // }
  //   window.addEventListener('selectionchange', () => {
  //     console.log('Selection Changed!')
  //     console.log('Selection:', window.getSelection())
  //   });
  // }, []);

  /* Loads a Txn When Selected Txn from localstorage changes
      problem: it only works once, when currentTxn changes
  */
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
      format(codeRef.current.innerText, _matchers, setMarkupHtml)
    }
  }, [currentTxn, psbtParam])

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
    format(codeRef.current.innerText, _matchers, setMarkupHtml) // can highlight codeRef
	}

  const handleTextClick = (e) => {
    // console.log('clicked, event:', e, 'selection start: ', e.target.selectionStart, 'coderef: ', codeRef.current.innerHTML)
    if (inputTxn !== '' && inputTxn !== undefined) {
      let cn = getClassNameAtPosition(codeRef.current.innerHTML, e.target.selectionStart)
      console.log('className: ', cn, ' explainer ref: ', explainerRef.current)

      updateExpandCollapsedDivs(explainerRef, cn, "test")
    }
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
          onClick={handleTextClick}
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
      <PsbtExplainerStruct ref={explainerRef} json={parsedTxn}/>
			{ process.env.NODE_ENV === 'development' ? (<div>lines: {info.lines} charsperline: {info.charsPerLine}</div>) : (<></>)}
    </div>
  )
}

export { PsbtTxn }