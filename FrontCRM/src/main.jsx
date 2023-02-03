import React from 'react'
import ReactDOM from 'react-dom/client'


import {ListsContextProvider} from './context/ListsContext';
import {App} from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListsContextProvider>
      <App/>
    </ListsContextProvider>
  </React.StrictMode>
)
