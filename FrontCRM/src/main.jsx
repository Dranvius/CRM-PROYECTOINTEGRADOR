import React from 'react'
import ReactDOM from 'react-dom/client'
import {ListsContextProvider} from './context/ListsContext';
import {App} from './App';

//!Funcionalidades esteticas de boostrap 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

//!Funcionalidades de boostrap 
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListsContextProvider>
      <App/>
    </ListsContextProvider>
  </React.StrictMode>
)
