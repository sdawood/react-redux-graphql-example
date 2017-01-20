import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo, receiveTodos, getVisibleTodos, FILTERS } from '../actions'

const FilterLink = ({
    filter,
    currentFilter,
    children,
    onClick
}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
           onClick={ e => {
            e.preventDefault();
            onClick(filter)
           }}
        >
          {children}
        </a>
    )
}

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
        const { todos, visibilityFilter, onTodoClick, onFilterClick, receiveTodos } = this.props
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
                <Footer visibilityFilter={visibilityFilter}
                        onFilterClick={onFilterClick}
                ></Footer>
            </div>
        )
    }
}

const Footer = ({
    visibilityFilter,
    onFilterClick
}) => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink
                filter={FILTERS.SHOW_ALL}
                currentFilter={visibilityFilter}
                onClick={onFilterClick}
            >
                All
            </FilterLink>
            {' '}
            <FilterLink
                filter={FILTERS.SHOW_ACTIVE}
                currentFilter={visibilityFilter}
                onClick={onFilterClick}
            >
                Active
            </FilterLink>
            {' '}
            <FilterLink
                filter={FILTERS.SHOW_COMPLETED}
                currentFilter={visibilityFilter}
                onClick={onFilterClick}
            >
                Completed
            </FilterLink>
        </p>
    )

}

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todoList.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        },
        receiveTodos: () => {
            dispatch(receiveTodos())
        },
        onFilterClick: (filter) => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
            });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)