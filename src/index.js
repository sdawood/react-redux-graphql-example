/*
* Slightly refactored from code @
* https://marufsarker.github.io/blog/posts/2016/05/09/react-redux-with-graphql.html
* */

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

import App from './components/App'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)
