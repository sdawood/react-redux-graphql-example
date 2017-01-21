import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo, receiveTodos } from '../actions'

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
        const {
            todos,
            isFetching,
            visibilityFilter,
            onTodoClick,
            onFilterClick,
            receiveTodos
        } = this.props
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

const FILTERS = {
    'SHOW_ALL': 'SHOW_ALL',
    'SHOW_ACTIVE': 'SHOW_ACTIVE',
    'SHOW_COMPLETED': 'SHOW_COMPLETED'
}

const getVisibleTodos = (
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
        isFetching: state.todoList.isFetching,
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

/*
* export a Container Component decorated with store subscribe/unscubscribe
* and handling context passed by Provider out of the presentational component TodoList
* */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)