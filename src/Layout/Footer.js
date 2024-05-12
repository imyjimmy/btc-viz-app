import React from 'react'

const Footer = () => {

  return (
    <div className="footer">
			{ process.env.NODE_ENV !== 'production' ? (<div className="node-env">{process.env.NODE_ENV}</div>):(<></>)}
		</div>
  )
}

export { Footer }