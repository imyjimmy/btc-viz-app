import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    document.addEventListener('selectionchange', () => {
      console.log('Selection Changed!')
    });
  }, []);
  return ( <textarea 
    id="editor" 
    name="txn"
    // ref={textareaRef}
    // onChange={changeInput}
    // onKeyUp={debounce((e) => {fetchTxn(e)})}
    // onScroll={syncScroll}
    // value={inputTxn}
    cols="20" 
    rows="12"
  /> );
}
 
export default Test;