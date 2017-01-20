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

export const FILTERS = {
    'SHOW_ALL': 'SHOW_ALL',
    'SHOW_ACTIVE': 'SHOW_ACTIVE',
    'SHOW_COMPLETED': 'SHOW_COMPLETED'
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

export const getVisibleTodos = (
    todos,
    filter
) => {
    switch(filter){
        case FILTERS.SHOW_ALL:
            return todos
        case FILTERS.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
        case FILTERS.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        default:
            return todos
    }

}
