import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { PSBT } from './pages/PSBT';
import { Bitcoin } from './pages/Bitcoin';
import Test from './Test';
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
      path: "/bitcoin/:txn?",
      element: <Bitcoin />,
    },
    // other pages....
    {
      path: "/psbt/:psbt?",
      element: <PSBT />,
    },
    {
      path: "/test/",
      element: <Test />,
    }
  ])

	return (
		<RouterProvider router={router} />
	);
}

export default App;

