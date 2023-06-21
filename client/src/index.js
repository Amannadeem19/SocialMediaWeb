import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk' 
import reducers from './reducers'
import './index.css'
const store  = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDom.render(
//    <ThemeProvider theme={theme}>
    <Provider store={store}> 
    <App/>
    </Provider>,
    // </ThemeProvider>, 
    document.getElementById('root')

)

