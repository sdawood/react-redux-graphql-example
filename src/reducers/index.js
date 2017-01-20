/**
 * Created by sdawood on 19/01/2017.
 */

import { combineReducers } from 'redux'

import { CONSTANTS } from '../actions'

const todoHandler = (todo, action) => {
    switch (action.type) {
        case CONSTANTS['ADD_TODO']:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case CONSTANTS['TOGGLE_TODO']:
            if (todo.id !== action.id) {
                return todo
            }
            return { ...todo,
                completed: !todo.completed
            }
        default:
            return todo
    }
}

let initialState = {
    todos: [],
    isFetching: false
}

const todosHandler = (state = initialState.todos, action) => {
    switch (action.type) {
        case CONSTANTS['ADD_TODO']:
            return [
                ...state,
                todoHandler(undefined, action)
            ];
        case CONSTANTS['TOGGLE_TODO']:
            return state.map(todo => todoHandler(todo, action))
        default:
            return state
    }
}

const todoListHandler = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS['ASYNC_ACTION']:
            return { ...state, isFetching: true}
        case CONSTANTS['RECEIVE_TODOS']:
            return Object.assign({}, state, {
                todos: action.todos,
                isFetching: false
            })
        case CONSTANTS['ADD_TODO']:
        case CONSTANTS['TOGGLE_TODO']:
            return Object.assign({}, state, {
                todos: todosHandler(state.todos, action),
                isFetching: false
            })
        default: return state
    }
}

const todoApp = combineReducers({
    todoList: todoListHandler
})

export default todoApp