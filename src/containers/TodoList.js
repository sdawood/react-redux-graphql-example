import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo, receiveTodos } from '../actions'

const Todo = ({ text, completed, onClick }) => {
    return (
        <li
            onClick={onClick}
            style={ {textDecoration: completed ? 'line-through' : 'none'} }
        >
            { text }
        </li>
    )
}

class TodoList extends Component {
    componentDidMount() {
        const { receiveTodos } = this.props
        receiveTodos()
    }
    render() {
        const { todos, onTodoClick, receiveTodos } = this.props
        return (
            <div>
                <button onClick={() => receiveTodos()}>RECEIVE</button>
                <ul>
                    {
                        todos.map(todo => {
                            return (
                                <Todo
                                    key={todo.id}
                                    {...todo}
                                    onClick={() => onTodoClick(todo.id)}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todoList.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        },
        receiveTodos: () => {
            dispatch(receiveTodos())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)