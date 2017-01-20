import React from 'react'

import '../styles/styles.css'

import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'

class App extends React.Component {
    render() {
        return (
            <div>
                <AddTodo/>
                <TodoList/>
            </div>
        );
    }
}

export default App