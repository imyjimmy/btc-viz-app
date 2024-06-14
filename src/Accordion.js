import { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, titleNode, children }) => {
  const [isActive, setIsActive] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isActive]);

  return (
    <div className={styles["accordion-item"]}>
      <div className={styles["accordion-title"]} onClick={() => setIsActive(!isActive)}>
        {title ? (<h3>{title}</h3>) : (<>{titleNode}</>)}
        <h5>{isActive ? '-' : '+'}</h5>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className={styles["accordion-content"]}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
