import { useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';

const CustomComponent = () => {
  const { width, height, ref } = useResizeDetector();
  const codeRef = useRef()
  return (<><pre ref={ref}>{`${width}x${height}`}
    <code ref={codeRef} className="language-html" id="highlighting-content" >
    </code>
  </pre>
  <div>{width}w {height}h</div>
  </>);
};

export { CustomComponent }