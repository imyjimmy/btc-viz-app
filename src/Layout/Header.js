import React from 'react';

const Header = () => {
  return (
    <nav className="nav">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">A Bit<span style={{ background: '#5a49c2'}}>coin</span><span style={{ background: '#5f7aa1'}}> Transaction </span>
					<span style={{ background: '#bb9f64'}}>Visualizer</span></h1>
					<div className="header-links">
						<h4><a href="/bitcoin">bitcoin</a></h4>
						<h4><a href="/psbt">psbt</a></h4>
					</div>
			</nav>
  )
}

export { Header }