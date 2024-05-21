import React from 'react';

const Header = () => {
  return (
    <nav className="nav">
				<h1>A Bit<span style={{ background: '#5a49c2'}}>coin</span><span style={{ background: '#5f7aa1'}}> Transaction </span>
					<span style={{ background: '#bb9f64'}}>Visualizer</span></h1>
					<div className="header-links">
						<a href="/bitcoin"><h4>bitcoin</h4></a>
						<a href="/psbt"><h4>psbt</h4></a>
					</div>
			</nav>
  )
}

export { Header }