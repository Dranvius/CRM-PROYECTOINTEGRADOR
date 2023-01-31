import React from 'react'
import ReactDOM from 'react-dom/client'


import {ParquesContextProvider} from './context/ParquesContext';
import {App} from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import './style/estilos.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParquesContextProvider>
      <App/>
    </ParquesContextProvider>
  </React.StrictMode>
)
