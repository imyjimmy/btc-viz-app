import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { PSBT } from './pages/PSBT';
import { Bitcoin } from './pages/Bitcoin';
// import { Txn } from './BtcTxn';
import "./App.css";

// import { TransactionIcon } from './TxnIcon';

function App() {
	/* Router */

	const router = createBrowserRouter([
    {
      path: "/",
      element: <Bitcoin />,
    },
		{
      path: "/bitcoin",
      element: <Bitcoin />,
    },
    // other pages....
    {
      path: "/psbt",
      element: <PSBT />,
    },
  ])

  /*
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em; 
  */
	return (
		<RouterProvider router={router} />
	);
}

export default App;

