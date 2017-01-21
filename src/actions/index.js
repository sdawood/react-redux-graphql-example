/**
 * Created by sdawood on 19/01/2017.
 */
let dbTodoList = {
    todos : [
        { id: 0, text: 'Todo 0', completed: false },
        { id: 1, text: 'Todo 1', completed: false }
    ]
}

export const CONSTANTS = {
    'ADD_TODO': 'ADD_TODO',
    'TOGGLE_TODO': 'TOGGLE_TODO',
    'ASYNC_ACTION': 'ASYNC_ACTION',
    'RECEIVE_TODOS': 'RECEIVE_TODOS',
    'SET_VISIBILITY_FILTER': 'SET_VISIBILITY_FILTER'
}

const todoID = () => Date.now().toString()

const asyncGetTodos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dbTodoList)
        }, 500)
    })
}

const asyncAddTodo = (text) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let id = todoID()
            dbTodoList.todos = [
                ...dbTodoList.todos, {
                    id,
                    text,
                    completed: false
                }
            ]
            resolve(id)
        }, 500)
    })
}

const asyncToggleTodo = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            dbTodoList.todos = dbTodoList.todos.map(todo => {
                if (todo.id !== id) {
                    return todo
                }
                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
            resolve(id)
        }, 500)
    })
}

const asyncAction = () => {
    return {
        type: CONSTANTS['ASYNC_ACTION']
    }
}

/* vvv THUNK actions, won't work without the thunk middleware vvv */
export const receiveTodos = () => {
    return (dispatch) => {
        dispatch(asyncAction())
        return asyncGetTodos()
            .then(todoList => dispatch({
                type: CONSTANTS['RECEIVE_TODOS'],
                todos: todoList.todos
            }))
    }
}

export const addTodo = (text) => {
    return (dispatch) => {
        dispatch(asyncAction())
        return asyncAddTodo(text)
            .then(id => {
                dispatch({
                    type: CONSTANTS['ADD_TODO'],
                    text,
                    id
                })
            })
    }
}

export const toggleTodo = (id) => {
    return (dispatch) => {
        dispatch(asyncAction())
        return asyncToggleTodo(id)
            .then(id => {
                dispatch({
                    type: CONSTANTS['TOGGLE_TODO'],
                    id
                })
            })
    }
}

/* ^^^ THUNK actions, won't work without the thunk middleware ^^^ */