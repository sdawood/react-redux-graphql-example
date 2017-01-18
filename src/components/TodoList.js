import React from 'react'

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

class TodoList extends React.Component {
    componentDidMount() {
        this.props.receiveTodos()
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

export default TodoList