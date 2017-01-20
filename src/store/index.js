import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

let middlewares = [thunkMiddleware]

if (JSON.stringify(process.env.NODE_ENV) === '"development"') {
    var loggerMiddleware = require('redux-logger')
    middlewares = [...middlewares, loggerMiddleware()]
}

import todoReducers from '../reducers'

export default createStore(
    todoReducers,
    applyMiddleware(...middlewares)
)