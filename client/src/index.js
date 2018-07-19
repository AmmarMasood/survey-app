import 'materialize-css/dist/css/materialize.min.css'; //this import materialize css
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers/index';
import axios from 'axios'; //this is so we can access axios library in our browser console. This is dev only
window.axios = axios;

const store =  createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store = {store}><App /></Provider>, 
	document.querySelector('#root')
);
