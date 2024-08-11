import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.nav}>
				<h2>A Bit<span style={{ background: '#5a49c2'}}>coin</span><span style={{ background: '#5f7aa1'}}> Transaction </span>
					<span style={{ background: '#bb9f64'}}>Visualizer</span></h2>
					<div className={styles["header-links"]}>
						<a href="/bitcoin"><h5>bitcoin</h5></a>
						<a href="/psbt"><h5>psbt</h5></a>
					</div>
			</nav>
  )
}

export { Header }