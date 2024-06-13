import { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, titleNode, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles["accordion-item"]}>
      <div className={styles["accordion-title"]} onClick={() => setIsActive(!isActive)}>
        {title ? (<h3>{title}</h3>):(<>{titleNode}</>)}
        <h5>{isActive ? '-' : '+'}</h5>
      </div>
      {isActive && <div className={styles["accordion-content"]}>{children}</div>}
    </div>
  );
};

export default Accordion;