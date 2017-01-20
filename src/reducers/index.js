/**
 * Created by sdawood on 19/01/2017.
 */

import { combineReducers } from 'redux'

import { CONSTANTS } from '../actions'

const todo = (todo, action) => {
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

const todos = (state = initialState.todos, action) => {
    switch (action.type) {
        case CONSTANTS['ADD_TODO']:
            return [
                ...state,
                todo(undefined, action)
            ];
        case CONSTANTS['TOGGLE_TODO']:
            return state.map(t => todo(t, action))
        default:
            return state
    }
}

const todoList = (state = {
    todos: [],
    isFetching: false
}, action) => {
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
                todos: todos(state.todos, action),
                isFetching: false
            })
        default: return state
    }
}

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case CONSTANTS.SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

const todoApp = combineReducers({
    todoList,
    visibilityFilter
})

export default todoApp