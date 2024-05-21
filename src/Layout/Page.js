import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './Page.css';

const Page = ({children}) => {

  return (
  <>
  <div className="App">
    <Header />
    <div className="container">
      {children}
    </div>
  </div>
  <Footer/>
  </>)
}

export { Page }