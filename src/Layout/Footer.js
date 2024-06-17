import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {

  return (
    <div className={styles.footer}>
			{ process.env.NODE_ENV !== 'production' ? (<div className="node-env">{process.env.NODE_ENV}</div>):(<></>)}
		</div>
  )
}

export { Footer }